import { BaseEntity } from 'src/config/db/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('banks')
export class Bank extends BaseEntity {
  @Column()
  codigo: string;

  @Column({ name: 'numero_banco' })
  numero_banco: string;

  @Column()
  nome: string;
}
