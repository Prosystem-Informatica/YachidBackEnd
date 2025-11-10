import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("invoice_items")
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  invoice_id!: string;

  @Column()
  product_id!: number;

  @Column({ type: "int" })
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  unit_price!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  total_price!: number;

  @Column({ type: "varchar", length: 10 })
  cfop!: string;

  @Column({ type: "varchar", length: 10 })
  ncm!: string;
}
