import { BaseEntity } from 'src/config/db/base.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Partner } from 'src/modules/partner/entity/partner.entity';


@Entity('payment_address')
export class PaymentAddress extends BaseEntity {

    @Column({nullable: true})
    representative: string;

    @Column()
    cep: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    observations: string;

    @Column()
    credit_account: boolean;

    @OneToOne(() => Partner)
    @JoinColumn({ name: 'partner_id' })
    partner: Partner;


}