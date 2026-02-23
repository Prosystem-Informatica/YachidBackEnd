import { BaseEntity } from 'src/config/db/base.entity';
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { ProductStockAddress } from './product-stock-address.entity';

@Entity('product_stocks')
export class ProductStock extends BaseEntity {
  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  saldo_disponivel: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  empenho: number;

  @Column({ type: 'timestamptz', nullable: true })
  data_ult_venda: Date;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  valor_ult_venda: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  saldo_empresa: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  empenho_empresa: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  prod_programada: number;

  @ManyToOne(() => Product, (product) => product.stocks)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToOne(() => ProductStockAddress, (address) => address.productStock, {
    cascade: true,
  })
  address: ProductStockAddress;
}
