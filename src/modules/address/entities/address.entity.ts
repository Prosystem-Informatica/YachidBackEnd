
import { Branch } from 'src/modules/branch/entities/branch.entity';
import { Entity,  Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/config/db/base.entity';
import { Partner } from 'src/modules/partner/entity/partner.entity';

@Entity('address')
export class Address extends BaseEntity{

    @Column({ type: 'varchar', length: 8 })
    cep: string;

    @Column({nullable: false})
    street: string;

    @Column({nullable: false})
    number: string;

    @Column({nullable: true})
    complement: string;

    @Column({nullable: false})
    neighborhood: string;

    @Column({nullable: false})
    city: string;

    @Column({nullable: true})
    city_ibge_code: string;

    @Column({nullable: false})
    country: string;

    @Column({nullable: true})
    region: string;

    @Column({nullable: false})
    uf: string;

    @OneToOne(() => Branch, (branch) => branch.address)
    branch: Branch;

    @OneToOne(() => Partner, (partner) => partner.address)
    partner: Partner;

}

