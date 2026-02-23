import { AccountsEntity } from "src/config/db/accounts-entity";
import { BaseEntity } from "src/config/db/base.entity";
import { Partner } from "src/modules/partner/entity/partner.entity";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

@Entity('accounts_payable')
export class AccountsPayable extends AccountsEntity {
    

    @OneToOne(() => Partner)
    @JoinColumn({ name: 'partner_id' })
    partner: Partner;
}