import { BaseEntity } from 'src/config/db/base.entity';
import { Branch } from 'src/modules/branch/entities/branch.entity';
import { Enterprise } from 'src/modules/enterprise/entities/enterprise.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('revenue_tax_details')
export class RevenueTaxDetails extends BaseEntity{

    @Column()
    bc_irpj: string;

    @Column()
    bc_csll: string;

    @Column()
    aliquota_irpj: string;

    @Column()
    aliquota_csll: string;

    @Column()
    ibs_uf: number;

    @Column()
    ibs_mun: number;

    @Column()
    cbs: number;

    @Column()
    over: string;

    @Column()
    value_over: string;

    @OneToOne(() => Branch)
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

}