import { BaseEntity } from 'src/config/db/base.entity';
import { Branch } from 'src/modules/branch/entities/branch.entity';
import { Enterprise } from 'src/modules/enterprise/entities/enterprise.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('revenue_tax_details')
export class RevenueTaxDetails extends BaseEntity{

    @Column({ nullable: true })
    bc_irpj: string ;

    @Column({ nullable: true })
    bc_csll: string ;

    @Column({ nullable: true })
    aliquota_irpj: string ;

    @Column({ nullable: true })
    aliquota_csll: string ;

    @Column({ nullable: true })
    ibs_uf: string ;

    @Column({ nullable: true })
    ibs_mun: string ;

    @Column({ nullable: true })
    cbs: string ;

    @Column({ nullable: true })
    over: string ;

    @Column({ nullable: true })
    value_over: string ;

    @Column({ nullable: true })
    aliquota: string ;

    @Column({ nullable: true })
    cofins: string ;

    @Column({ nullable: true })
    pis: string ;

    @Column({ nullable: true })
    icms: string ;

    @OneToOne(() => Branch)
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

}