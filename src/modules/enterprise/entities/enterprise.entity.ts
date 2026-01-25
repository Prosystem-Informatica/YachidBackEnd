import { IsEnum } from "class-validator";
import { Address } from "src/modules/address/entities/address.entity";
import { Entrepreneur } from "src/modules/entrepreneur/entities/entrepreneur.entity";
import { Photo } from "src/modules/photos/entities/photo.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from "typeorm";

  export enum EnterpriseStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }
  
  @Entity("enterprises")
  export class Enterprise {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ nullable: false})
    document!: string;

    @Column({nullable: false})
    social_reason!: string;

    @Column({nullable: false})
    fantasy_name!: string;

    @Column({ type: 'enum', enum: EnterpriseStatus })
    status!: EnterpriseStatus;

    @Column({nullable: false})
    phone!: string;

    @Column({nullable: false})
    email!: string;

    @Column({nullable: true})
    website!: string;

    @Column({nullable: true})
    accounting_email!: string;

    @OneToOne(() => Address)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @ManyToOne(() => Entrepreneur)
    @JoinColumn({ name: "entrepreneur_id" })
    entrepreneur!: Entrepreneur;
  }