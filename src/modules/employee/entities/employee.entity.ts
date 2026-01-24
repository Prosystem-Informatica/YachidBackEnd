import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    JoinColumn,
    OneToOne,
  } from "typeorm";
  import { Enterprise } from "../../enterprise/entities/enterprise.entity";
  // import { SubEnterprise } from "../../enterprise/entities/subEnterprise.entity";
import { Address } from "src/modules/address/entities/address.entity";
import * as createEmployeeDto from "../dto/create-employee.dto";
import { Photo } from "src/modules/photos/entities/photo.entity";
  
  @Entity("employees")
  export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column()
    name!: string;
  
    @Column({ unique: true })
    email!: string;
  
    @Column()
    password!: string;
  
    @Column()
    phone!: string;
  
    @Column()
    document!: string;
  
    @Column()
    role!: string;
  
    @Column()
    status!: createEmployeeDto.EmployeeStatus;
  
    // @ManyToOne(() => Enterprise, (enterprise) => enterprise.employees)
    // @JoinColumn({ name: "enterprise_id" })
    // enterprise!: Enterprise;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at!: string;


    @OneToOne(() => Address)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @OneToOne(() => Photo)
    photo: Photo;
  }