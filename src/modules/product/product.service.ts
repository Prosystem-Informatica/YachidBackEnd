import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EDatabase } from 'src/config/db/database.config';
import { Product } from './entities/product.entity';
import { ProductComponent } from './entities/product-component.entity';
import { ProductStock } from './entities/product-stock.entity';
import { ProductStockAddress } from './entities/product-stock-address.entity';
import { ProductNotaFiscal } from './entities/product-nota-fiscal.entity';
import { ProductIvaItem } from './entities/product-iva-item.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { CreateProductComponentDto } from './dto/create-product-component.dto';
import { UpdateProductComponentDto } from './dto/update-product-component.dto';
import { UpdateProductNotaFiscalDto } from './dto/update-product-nota-fiscal.dto';
import { ListProductsDto } from './dto/list-products.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product, EDatabase.YACHID)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductStock, EDatabase.YACHID)
    private readonly productStockRepository: Repository<ProductStock>,
    @InjectRepository(ProductStockAddress, EDatabase.YACHID)
    private readonly productStockAddressRepository: Repository<ProductStockAddress>,
    @InjectRepository(ProductComponent, EDatabase.YACHID)
    private readonly productComponentRepository: Repository<ProductComponent>,
    @InjectRepository(ProductNotaFiscal, EDatabase.YACHID)
    private readonly productNotaFiscalRepository: Repository<ProductNotaFiscal>,
    @InjectRepository(ProductIvaItem, EDatabase.YACHID)
    private readonly productIvaItemRepository: Repository<ProductIvaItem>,
  ) {}

  async findAll(listProductsDto: ListProductsDto): Promise<{
    products: Product[];
    total: number;
  }> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Getting products: ${uuid}`);

      const queryBuilder = this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.stocks', 'stocks')
        .leftJoinAndSelect('stocks.address', 'address');

      if (listProductsDto.search) {
        queryBuilder.where(
          '(product.produto ILIKE :search OR product.codigo ILIKE :search OR product.cod_barras ILIKE :search)',
          { search: `%${listProductsDto.search}%` },
        );
      }

      const total = await queryBuilder.getCount();

      if (listProductsDto.limit !== undefined) {
        queryBuilder.take(listProductsDto.limit);
      }
      if (listProductsDto.offset !== undefined) {
        queryBuilder.skip(listProductsDto.offset);
      }

      queryBuilder.orderBy('product.produto', 'ASC');

      const products = await queryBuilder.getMany();

      return { products, total };
    } catch (error) {
      this.logger.error(`Error getting products: ${uuid}: ${error.message}`);
      throw new BadRequestException(error.message ?? 'Error getting products');
    }
  }

  async findOne(productId: string): Promise<Product> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Getting product details: ${uuid}`);
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: [
          'stocks',
          'stocks.address',
          'components',
          'nota_fiscal',
          'nota_fiscal.iva_tabela',
        ],
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      return product;
    } catch (error) {
      this.logger.error(`Error getting product details: ${uuid}: ${error.message}`);
      throw new BadRequestException(
        error.message ?? 'Error getting product details',
      );
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Creating product: ${uuid}`);

      const product = this.productRepository.create({
        codigo: createProductDto.codigo,
        ultimo_codigo: createProductDto.ultimo_codigo,
        penultimo_codigo: createProductDto.penultimo_codigo,
        linha: createProductDto.linha,
        cod_barras: createProductDto.cod_barras,
        status: createProductDto.status ?? true,
        produto: createProductDto.produto,
        tipo: createProductDto.tipo,
        familia: createProductDto.familia,
        unidade: createProductDto.unidade,
        fabricante: createProductDto.fabricante,
        gramatura: createProductDto.gramatura,
        calcula_icms: createProductDto.calcula_icms ?? false,
        cod_tributario: createProductDto.cod_tributario,
        peso_bruto: createProductDto.peso_bruto,
        peso_liquido: createProductDto.peso_liquido,
        peso_produto: createProductDto.peso_produto,
        embalagem: createProductDto.embalagem,
        classificacao: createProductDto.classificacao,
        validade: createProductDto.validade,
        produto_avulso: createProductDto.produto_avulso ?? false,
        tipo_custo: createProductDto.tipo_custo,
        custo_calculado: createProductDto.custo_calculado,
        custo_digitado: createProductDto.custo_digitado,
        custo_medio: createProductDto.custo_medio,
        ultimo_custo: createProductDto.ultimo_custo,
        penultimo_custo: createProductDto.penultimo_custo,
        ant_pen_custo: createProductDto.ant_pen_custo,
        preco_min_7: createProductDto.preco_min_7,
        preco_min_12: createProductDto.preco_min_12,
        preco_min_18: createProductDto.preco_min_18,
        preco_tabela: createProductDto.preco_tabela,
        preco_anterior: createProductDto.preco_anterior,
      });

      const savedProduct = await this.productRepository.save(product);

      if (createProductDto.stock) {
        const stockData: DeepPartial<ProductStock> = {
          product: { id: savedProduct.id },
          saldo_disponivel: createProductDto.stock.saldo_disponivel ?? 0,
          empenho: createProductDto.stock.empenho ?? 0,
          data_ult_venda: createProductDto.stock.data_ult_venda
            ? new Date(createProductDto.stock.data_ult_venda)
            : undefined,
          valor_ult_venda: createProductDto.stock.valor_ult_venda ?? undefined,
          saldo_empresa: createProductDto.stock.saldo_empresa ?? 0,
          empenho_empresa: createProductDto.stock.empenho_empresa ?? 0,
          prod_programada: createProductDto.stock.prod_programada ?? 0,
        };
        const savedStock = await this.productStockRepository.save(stockData);

        if (createProductDto.stock.address) {
          const addressData: DeepPartial<ProductStockAddress> = {
            productStock: { id: savedStock.id },
            rua: createProductDto.stock.address.rua,
            prateleiras: createProductDto.stock.address.prateleiras,
            estoque_minimo: createProductDto.stock.address.estoque_minimo ?? 0,
            estoque_maximo: createProductDto.stock.address.estoque_maximo ?? 0,
          };
          await this.productStockAddressRepository.save(addressData);
        }
      }

      this.logger.log(`Product created: ${uuid}`);
      return this.findOne(savedProduct.id);
    } catch (error) {
      this.logger.error(`Error creating product: ${uuid}: ${error.message}`);
      throw new BadRequestException(error.message ?? 'Error creating product');
    }
  }

  async update(productId: string, updateProductDto: UpdateProductDto): Promise<void> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Updating product: ${uuid}`);

      await this.productRepository.findOneOrFail({
        where: { id: productId },
      });

      const updateData = Object.fromEntries(
        Object.entries(updateProductDto).filter(([_, v]) => v !== undefined),
      );
      await this.productRepository.update(productId, updateData);
    } catch (error) {
      this.logger.error(`Error updating product: ${uuid}: ${error.message}`);
      throw new BadRequestException(error.message ?? 'Error updating product');
    }
  }

  async createStock(
    productId: string,
    createProductStockDto: CreateProductStockDto,
  ): Promise<Product> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Creating product stock: ${uuid}`);

      await this.productRepository.findOneOrFail({
        where: { id: productId },
      });

      const stockData: DeepPartial<ProductStock> = {
        product: { id: productId },
        saldo_disponivel: createProductStockDto.saldo_disponivel ?? 0,
        empenho: createProductStockDto.empenho ?? 0,
        data_ult_venda: createProductStockDto.data_ult_venda
          ? new Date(createProductStockDto.data_ult_venda)
          : undefined,
        valor_ult_venda: createProductStockDto.valor_ult_venda ?? undefined,
        saldo_empresa: createProductStockDto.saldo_empresa ?? 0,
        empenho_empresa: createProductStockDto.empenho_empresa ?? 0,
        prod_programada: createProductStockDto.prod_programada ?? 0,
      };
      const savedStock =
        await this.productStockRepository.save(stockData);

      if (createProductStockDto.address) {
        const addressData: DeepPartial<ProductStockAddress> = {
          productStock: { id: savedStock.id },
          rua: createProductStockDto.address.rua,
          prateleiras: createProductStockDto.address.prateleiras,
          estoque_minimo: createProductStockDto.address.estoque_minimo ?? 0,
          estoque_maximo: createProductStockDto.address.estoque_maximo ?? 0,
        };
        await this.productStockAddressRepository.save(addressData);
      }

      this.logger.log(`Product stock created: ${uuid}`);
      return this.findOne(productId);
    } catch (error) {
      this.logger.error(
        `Error creating product stock: ${uuid}: ${error.message}`,
      );
      throw new BadRequestException(
        error.message ?? 'Error creating product stock',
      );
    }
  }

  async updateStock(
    productId: string,
    stockId: string,
    updateProductStockDto: UpdateProductStockDto,
  ): Promise<Product> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Updating product stock: ${uuid}`);

      const stock = await this.productStockRepository.findOne({
        where: { id: stockId, product: { id: productId } },
        relations: ['address'],
      });

      if (!stock) {
        throw new BadRequestException('Stock not found');
      }

      const stockUpdateData: Partial<ProductStock> = {};
      if (updateProductStockDto.saldo_disponivel !== undefined)
        stockUpdateData.saldo_disponivel = updateProductStockDto.saldo_disponivel;
      if (updateProductStockDto.empenho !== undefined)
        stockUpdateData.empenho = updateProductStockDto.empenho;
      if (updateProductStockDto.data_ult_venda !== undefined)
        stockUpdateData.data_ult_venda = new Date(
          updateProductStockDto.data_ult_venda,
        );
      if (updateProductStockDto.valor_ult_venda !== undefined)
        stockUpdateData.valor_ult_venda = updateProductStockDto.valor_ult_venda;
      if (updateProductStockDto.saldo_empresa !== undefined)
        stockUpdateData.saldo_empresa = updateProductStockDto.saldo_empresa;
      if (updateProductStockDto.empenho_empresa !== undefined)
        stockUpdateData.empenho_empresa =
          updateProductStockDto.empenho_empresa;
      if (updateProductStockDto.prod_programada !== undefined)
        stockUpdateData.prod_programada =
          updateProductStockDto.prod_programada;

      if (Object.keys(stockUpdateData).length > 0) {
        await this.productStockRepository.update(stockId, stockUpdateData);
      }

      if (updateProductStockDto.address) {
        const addr = updateProductStockDto.address;
        const addressUpdateData: Partial<ProductStockAddress> = {};
        if (addr.rua !== undefined) addressUpdateData.rua = addr.rua;
        if (addr.prateleiras !== undefined)
          addressUpdateData.prateleiras = addr.prateleiras;
        if (addr.estoque_minimo !== undefined)
          addressUpdateData.estoque_minimo = addr.estoque_minimo;
        if (addr.estoque_maximo !== undefined)
          addressUpdateData.estoque_maximo = addr.estoque_maximo;

        if (stock.address) {
          if (Object.keys(addressUpdateData).length > 0) {
            await this.productStockAddressRepository.update(
              stock.address.id,
              addressUpdateData,
            );
          }
        } else if (addr.rua && addr.prateleiras) {
          await this.productStockAddressRepository.save({
            productStock: { id: stockId },
            rua: addr.rua,
            prateleiras: addr.prateleiras,
            estoque_minimo: addr.estoque_minimo ?? 0,
            estoque_maximo: addr.estoque_maximo ?? 0,
          });
        }
      }

      this.logger.log(`Product stock updated: ${uuid}`);
      return this.findOne(productId);
    } catch (error) {
      this.logger.error(
        `Error updating product stock: ${uuid}: ${error.message}`,
      );
      throw new BadRequestException(
        error.message ?? 'Error updating product stock',
      );
    }
  }

  async createComponent(
    productId: string,
    createProductComponentDto: CreateProductComponentDto,
  ): Promise<Product> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Creating product component: ${uuid}`);

      await this.productRepository.findOneOrFail({
        where: { id: productId },
      });

      const componentData: DeepPartial<ProductComponent> = {
        product: { id: productId },
        codigo: createProductComponentDto.codigo,
        componente: createProductComponentDto.componente,
        unidade: createProductComponentDto.unidade ?? undefined,
        prc_custo: createProductComponentDto.prc_custo ?? 0,
        quantidade: createProductComponentDto.quantidade ?? 0,
        peso: createProductComponentDto.peso ?? 0,
        total: createProductComponentDto.total ?? 0,
      };
      await this.productComponentRepository.save(componentData);

      this.logger.log(`Product component created: ${uuid}`);
      return this.findOne(productId);
    } catch (error) {
      this.logger.error(
        `Error creating product component: ${uuid}: ${error.message}`,
      );
      throw new BadRequestException(
        error.message ?? 'Error creating product component',
      );
    }
  }

  async updateNotaFiscal(
    productId: string,
    updateDto: UpdateProductNotaFiscalDto,
  ): Promise<void> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Updating product nota fiscal: ${uuid}`);

      await this.productRepository.findOneOrFail({
        where: { id: productId },
      });

      let notaFiscal = await this.productNotaFiscalRepository.findOne({
        where: { product: { id: productId } },
        relations: ['iva_tabela'],
      });

      if (!notaFiscal) {
        notaFiscal = this.productNotaFiscalRepository.create({
          product: { id: productId },
        });
        notaFiscal = await this.productNotaFiscalRepository.save(notaFiscal);
      }

      const updateData: Partial<ProductNotaFiscal> = {};
      if (updateDto.iva_estado !== undefined)
        updateData.iva_estado = updateDto.iva_estado;
      if (updateDto.iva_valor !== undefined)
        updateData.iva_valor = updateDto.iva_valor;
      if (updateDto.ncm !== undefined) updateData.ncm = updateDto.ncm;
      if (updateDto.cest !== undefined) updateData.cest = updateDto.cest;
      if (updateDto.reducao_perc !== undefined)
        updateData.reducao_perc = updateDto.reducao_perc;
      if (updateDto.origem_icms !== undefined)
        updateData.origem_icms = updateDto.origem_icms;
      if (updateDto.sit_tributaria_icms !== undefined)
        updateData.sit_tributaria_icms = updateDto.sit_tributaria_icms;
      if (updateDto.cst_ibs !== undefined)
        updateData.cst_ibs = updateDto.cst_ibs;
      if (updateDto.classificacao_tributaria_ibs !== undefined)
        updateData.classificacao_tributaria_ibs =
          updateDto.classificacao_tributaria_ibs;
      if (updateDto.cst_cbs !== undefined)
        updateData.cst_cbs = updateDto.cst_cbs;
      if (updateDto.classificacao_tributaria_cbs !== undefined)
        updateData.classificacao_tributaria_cbs =
          updateDto.classificacao_tributaria_cbs;
      if (updateDto.classe_enquadramento_ipi !== undefined)
        updateData.classe_enquadramento_ipi =
          updateDto.classe_enquadramento_ipi;
      if (updateDto.codigo_enquadramento_ipi !== undefined)
        updateData.codigo_enquadramento_ipi =
          updateDto.codigo_enquadramento_ipi;
      if (updateDto.aliquota_ipi !== undefined)
        updateData.aliquota_ipi = updateDto.aliquota_ipi;
      if (updateDto.sit_tributaria_ipi !== undefined)
        updateData.sit_tributaria_ipi = updateDto.sit_tributaria_ipi;
      if (updateDto.sit_tributaria_pis !== undefined)
        updateData.sit_tributaria_pis = updateDto.sit_tributaria_pis;
      if (updateDto.aliquota_pis !== undefined)
        updateData.aliquota_pis = updateDto.aliquota_pis;
      if (updateDto.sit_tributaria_cofins !== undefined)
        updateData.sit_tributaria_cofins = updateDto.sit_tributaria_cofins;
      if (updateDto.aliquota_cofins !== undefined)
        updateData.aliquota_cofins = updateDto.aliquota_cofins;

      if (Object.keys(updateData).length > 0) {
        await this.productNotaFiscalRepository.update(
          notaFiscal.id,
          updateData,
        );
      }

      if (updateDto.iva_tabela !== undefined) {
        await this.productIvaItemRepository.delete({
          notaFiscal: { id: notaFiscal.id },
        });
        for (const item of updateDto.iva_tabela) {
          await this.productIvaItemRepository.save({
            notaFiscal: { id: notaFiscal.id },
            estado: item.estado,
            valor: item.valor,
          });
        }
      }

      this.logger.log(`Product nota fiscal updated: ${uuid}`);
    } catch (error) {
      this.logger.error(
        `Error updating product nota fiscal: ${uuid}: ${error.message}`,
      );
      throw new BadRequestException(
        error.message ?? 'Error updating product nota fiscal',
      );
    }
  }

  async updateComponent(
    productId: string,
    componentId: string,
    updateProductComponentDto: UpdateProductComponentDto,
  ): Promise<Product> {
    const uuid = uuidv4();
    try {
      this.logger.log(`Updating product component: ${uuid}`);

      const component = await this.productComponentRepository.findOne({
        where: { id: componentId, product: { id: productId } },
      });

      if (!component) {
        throw new BadRequestException('Component not found');
      }

      const updateData: Partial<ProductComponent> = {};
      if (updateProductComponentDto.codigo !== undefined)
        updateData.codigo = updateProductComponentDto.codigo;
      if (updateProductComponentDto.componente !== undefined)
        updateData.componente = updateProductComponentDto.componente;
      if (updateProductComponentDto.unidade !== undefined)
        updateData.unidade = updateProductComponentDto.unidade;
      if (updateProductComponentDto.prc_custo !== undefined)
        updateData.prc_custo = updateProductComponentDto.prc_custo;
      if (updateProductComponentDto.quantidade !== undefined)
        updateData.quantidade = updateProductComponentDto.quantidade;
      if (updateProductComponentDto.peso !== undefined)
        updateData.peso = updateProductComponentDto.peso;
      if (updateProductComponentDto.total !== undefined)
        updateData.total = updateProductComponentDto.total;

      if (Object.keys(updateData).length > 0) {
        await this.productComponentRepository.update(componentId, updateData);
      }

      this.logger.log(`Product component updated: ${uuid}`);
      return this.findOne(productId);
    } catch (error) {
      this.logger.error(
        `Error updating product component: ${uuid}: ${error.message}`,
      );
      throw new BadRequestException(
        error.message ?? 'Error updating product component',
      );
    }
  }
}
