import { Enterprise } from 'src/modules/enterprise/entities/enterprise.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('revenue_tax_details')
export class RevenueTaxDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    regime_tributario_issqn?: string;

    @Column()
    ind_ret_issqn?: string;

    @Column()
    receita_bruta_12m?: number;

    @Column()
    aliquota?: number;

    @Column()
    pis?: number;

    @Column()
    cofins?: number;

    @Column()
    icms?: number;

    @Column()
    ibc_uf?: number;

    @Column()
    ibs_mun?: number;

    @Column()
    cbs?: number;

    // @OneToOne(() => Enterprise, (enterprise) => enterprise.revenueTaxDetails)
    // @JoinColumn({ name: 'enterprise_id' })
    // enterprise: Enterprise;

}