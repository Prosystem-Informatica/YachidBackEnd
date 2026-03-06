import { BaseEntity } from 'src/config/db/base.entity';
import { LayoutRemessa } from 'src/core/enum/enums';
import { Column, Entity } from 'typeorm';

@Entity('banks')
export class Bank extends BaseEntity {
  @Column({ type: 'int', generated: 'increment' })
  codigo: number;

  @Column({ name: 'numero_banco' })
  numero_banco: string;

  @Column()
  nome: string;

  @Column({ name: 'agencia_numero', nullable: true })
  agencia_numero: string ;

  @Column({ name: 'agencia_dv', nullable: true })
  agencia_dv: string ;

  @Column({ name: 'conta_numero', nullable: true })
  conta_numero: string ;

  @Column({ name: 'conta_dv', nullable: true })
  conta_dv: string ;

  @Column({ name: 'codigo_cedente', nullable: true })
  codigo_cedente: string ;

  @Column({ name: 'codigo_convenio', nullable: true })
  codigo_convenio: string ;

  @Column({ name: 'codigo_empresa', nullable: true })
  codigo_empresa: string ;

  @Column({ name: 'ultimo_boleto_emitido', type: 'int', nullable: true })
  ultimo_boleto_emitido: number ;

  @Column({ name: 'codigo_transmissao', nullable: true })
  codigo_transmissao: string ;

  @Column({ name: 'mora_diaria_percent', type: 'decimal', precision: 10, scale: 4, nullable: true })
  mora_diaria_percent: number ;

  @Column({ nullable: true })
  carteira: string ;

  @Column({ name: 'variacao_carteira', nullable: true })
  variacao_carteira: string ;

  @Column({ name: 'multa_percent', type: 'decimal', precision: 10, scale: 4, nullable: true })
  multa_percent: number ;

  @Column({ name: 'dias_protesto', type: 'int', nullable: true })
  dias_protesto: number ;

  @Column({ name: 'layout_remessa', type: 'enum', enum: LayoutRemessa, nullable: true })
  layout_remessa: LayoutRemessa ;

  @Column({ name: 'instrucoes_boleto', type: 'text', nullable: true })
  instrucoes_boleto: string ;
}
