import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/db/base.entity";
import { CarrierPartner } from "src/modules/carrier-partner/entities/carrier-partner.entity";

@Entity({ name: 'carriers' })

export class Carrier extends BaseEntity {

    @Column()
    name: string;

    @OneToMany(() => CarrierPartner, (carrierPartner) => carrierPartner.carrier)
    partners: CarrierPartner[];
}