import { BaseEntity } from 'src/config/db/base.entity';
import { PartnerPersonType, PartnerStatus, PartnerType } from 'src/core/enum/enums';
import { Address } from 'src/modules/address/entities/address.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { CarrierPartner } from 'src/modules/carrier-partner/entities/carrier-partner.entity';
import { Carrier } from 'src/modules/carrier/entities/carrier.entity';
import { DeliveryAddress } from 'src/modules/delivery-address/entities/delivery-address.entity';
import { Entity, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';

@Entity('partners')
export class Partner  extends BaseEntity {

    @Column()
    codigo: string;

    @Column()
    document: string;

    @Column()
    ie_rg: string;

    @Column()
    name: string;

    @Column()
    fantasy_name: string;

    @Column()
    main_phone: string;

    @Column()
    secondary_phone: string;

    @Column()
    cellphone: string;

    @Column()
    person_type: PartnerPersonType;

    @Column()
    partner_type: PartnerType;

    @Column()
    suframa: string;

    @Column()
    business_sector: string;

    @Column()
    email_nfe: string;

    @Column()
    email: string;

    @Column()
    site: string;

    @Column()
    status: PartnerStatus;

    @Column({nullable: true})
    accounting_account: string;

    @Column()
    type: string;

    @Column()
    provision: boolean;

    @Column()
    fixed_expenses: boolean

    @OneToOne(() => Address, (address) => address.partner)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @OneToMany(() => CarrierPartner, (carrierPartner) => carrierPartner.partner)
    carriers: CarrierPartner[];

    @ManyToOne(() => Group, { nullable: true })
    @JoinColumn({ name: 'group_id' })
    group?: Group;

    @OneToMany(() => DeliveryAddress, (deliveryAddress) => deliveryAddress.partner)
    deliveryAddresses: DeliveryAddress[];
}