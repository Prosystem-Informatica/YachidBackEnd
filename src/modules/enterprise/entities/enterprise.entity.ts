import { IsEnum } from "class-validator";
import { BaseEntity } from "src/config/db/base.entity";
import { Address } from "src/modules/address/entities/address.entity";
import { Branch } from "src/modules/branch/entities/branch.entity";
import { Entrepreneur } from "src/modules/entrepreneur/entities/entrepreneur.entity";
import { Photo } from "src/modules/photos/entities/photo.entity";
import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
  } from "typeorm";

  export enum EnterpriseStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }


  
  @Entity("enterprises")
  export class Enterprise extends BaseEntity{
  
    @Column({ nullable: false, unique: true, length: 14})
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

    @ManyToOne(() => Entrepreneur)
    @JoinColumn({ name: "entrepreneur_id" })
    entrepreneur!: Entrepreneur;

    @OneToMany(() => Branch, (branch) => branch.enterprise)
    branches!: Branch[];

  }