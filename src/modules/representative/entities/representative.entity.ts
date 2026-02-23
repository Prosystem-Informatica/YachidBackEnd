import { BaseEntity } from 'src/config/db/base.entity';
import { TipoComissao } from 'src/core/enum/enums';
import { Address } from 'src/modules/address/entities/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('representatives')
export class Representative extends BaseEntity {
  @Column()
  codigo: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  comissao: number;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  documento: string;

  @Column({ nullable: true })
  ie_rg: string;

  @Column({ nullable: true })
  celular: string;

  @Column({ nullable: true })
  contato: string;

  @Column({ nullable: true })
  email: string;

  @Column({
    type: 'enum',
    enum: TipoComissao,
    default: TipoComissao.SEM_COMISSAO,
  })
  tipo_comissao: TipoComissao;

  @Column({ default: false })
  pre_pedido: boolean;

  @Column({ default: false })
  aplicativo: boolean;

  @OneToOne(() => Address, { eager: true, nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
