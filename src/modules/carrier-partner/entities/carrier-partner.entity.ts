import { BaseEntity } from "src/config/db/base.entity";
import { Carrier } from "src/modules/carrier/entities/carrier.entity";
import { Partner } from "src/modules/partner/entity/partner.entity";
import { Entity, ManyToOne, Unique } from "typeorm";

@Entity('carrier_partners')
@Unique(['carrier', 'partner'])
export class CarrierPartner extends BaseEntity {

    @ManyToOne(() => Carrier, (carrier) => carrier.partners)
    carrier: Carrier;

    @ManyToOne(() => Partner, (partner) => partner.carriers)
    partner: Partner;
}