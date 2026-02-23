import { BaseEntity } from 'src/config/db/base.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ProductStock } from './product-stock.entity';

@Entity('product_stock_addresses')
export class ProductStockAddress extends BaseEntity {
  @Column()
  rua: string;

  @Column()
  prateleiras: string;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  estoque_minimo: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  estoque_maximo: number;

  @OneToOne(() => ProductStock, (stock) => stock.address)
  @JoinColumn({ name: 'product_stock_id' })
  productStock: ProductStock;
}
