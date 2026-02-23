import { AccountsEntity } from "src/config/db/accounts-entity";
import { Partner } from "src/modules/partner/entity/partner.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('accounts_receivable')
export class AccountsReceivable extends AccountsEntity {
 
    @Column()
    receberto_aberto: string;

    @Column()
    cheq_em_aberto: string;

    @Column()
    cheq_a_vencer: string;

    @Column()
    serasa: string;

    @Column()
    average_orders: string;

    @Column()
    processed_orders: string;

    @OneToOne(() => Partner)
    @JoinColumn({ name: 'partner_id' })
    partner: Partner;
    

}