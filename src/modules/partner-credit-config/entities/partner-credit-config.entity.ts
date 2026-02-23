import { BaseEntity } from "src/config/db/base.entity";
import { Partner } from "src/modules/partner/entity/partner.entity";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

@Entity('partner_credit_config')
export class PartnerCreditConfig extends BaseEntity {

    @Column()
    credit_value: string;

    @Column()
    serasa_check: boolean;

    @Column()
    date: Date;

    @Column()
    new_order: boolean;

    @Column()
    order_release: boolean;

    @Column()
    nfe_issuance: boolean;

    @Column()
    credit_analysis: boolean;

    @OneToOne(() => Partner)
    @JoinColumn({ name: 'partner_id' })
    partner: Partner;

}