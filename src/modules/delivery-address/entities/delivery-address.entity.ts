import { BaseEntity } from "src/config/db/base.entity";
import { Partner } from "src/modules/partner/entity/partner.entity";
import { Entity, Column,  JoinColumn, ManyToOne } from 'typeorm';

@Entity('delivery_address')
export class DeliveryAddress extends BaseEntity {
    
    @Column()
    cep: string;

    @Column()
    street: string;

    @Column()
    region: string;

    @Column()
    neighborhood: string;

    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    observations: string;

    @Column()
    bonification: boolean;

    @ManyToOne(() => Partner)
    @JoinColumn({ name: 'partner_id' })
    partner: Partner;
}