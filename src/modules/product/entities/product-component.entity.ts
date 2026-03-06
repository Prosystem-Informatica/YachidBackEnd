import { BaseEntity } from 'src/config/db/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_components')
export class ProductComponent extends BaseEntity {
  @Column({ type: 'int', generated: 'increment' })
  codigo: number;

  @Column()
  componente: string;

  @Column({ nullable: true })
  unidade: string;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  prc_custo: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  quantidade: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  peso: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  total: number;

  @ManyToOne(() => Product, (product) => product.components)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
