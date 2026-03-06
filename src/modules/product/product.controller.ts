import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { CreateProductComponentDto } from './dto/create-product-component.dto';
import { UpdateProductComponentDto } from './dto/update-product-component.dto';
import { UpdateProductNotaFiscalDto } from './dto/update-product-nota-fiscal.dto';
import { ListProductsDto } from './dto/list-products.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getProducts(@Query() listProductsDto: ListProductsDto) {
    return this.productService.findAll(listProductsDto);
  }

  @UseGuards(AuthGuard)
  @Get(':productId')
  async getProductDetails(@Param('productId') productId: string) {
    return this.productService.findOne(productId);
  }

  @UseGuards(AuthGuard)
  @Post(':groupId')
  async createProduct(
    @Param('groupId') groupId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(groupId, createProductDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Patch(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    return this.productService.update(productId, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Post(':productId/stocks')
  async createProductStock(
    @Param('productId') productId: string,
    @Body() createProductStockDto: CreateProductStockDto,
  ) {
    return this.productService.createStock(productId, createProductStockDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':productId/stocks/:stockId')
  async updateProductStock(
    @Param('productId') productId: string,
    @Param('stockId') stockId: string,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ) {
    return this.productService.updateStock(
      productId,
      stockId,
      updateProductStockDto,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':productId/components')
  async createProductComponent(
    @Param('productId') productId: string,
    @Body() createProductComponentDto: CreateProductComponentDto,
  ) {
    return this.productService.createComponent(
      productId,
      createProductComponentDto,
    );
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Patch(':productId/nota-fiscal')
  async updateProductNotaFiscal(
    @Param('productId') productId: string,
    @Body() updateProductNotaFiscalDto: UpdateProductNotaFiscalDto,
  ): Promise<void> {
    return this.productService.updateNotaFiscal(
      productId,
      updateProductNotaFiscalDto,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':productId/components/:componentId')
  async updateProductComponent(
    @Param('productId') productId: string,
    @Param('componentId') componentId: string,
    @Body() updateProductComponentDto: UpdateProductComponentDto,
  ) {
    return this.productService.updateComponent(
      productId,
      componentId,
      updateProductComponentDto,
    );
  }
}
