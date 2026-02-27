import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { Product } from './entities/product.entity';
import { ProductComponent } from './entities/product-component.entity';
import { ProductStock } from './entities/product-stock.entity';
import { ProductStockAddress } from './entities/product-stock-address.entity';
import { ProductNotaFiscal } from './entities/product-nota-fiscal.entity';
import { ProductIvaItem } from './entities/product-iva-item.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Product,
        ProductComponent,
        ProductStock,
        ProductStockAddress,
        ProductNotaFiscal,
        ProductIvaItem,
      ],
      EDatabase.YACHID,
    ),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
