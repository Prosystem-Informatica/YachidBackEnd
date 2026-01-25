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
import * as createEmployeeDto from "../dto/create-employee.dto";
import { Photo } from "src/modules/photos/entities/photo.entity";
import { User } from "src/modules/user/entities/user.entity";


export enum EmployeeRole {
  ADMIN = 'admin',
  USER = 'user',
}
  
  @Entity("employees")
  export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column()
    name!: string;
    
    @Column()
    phone!: string;
  
    @Column()
    document!: string;
  
    @Column({ type: 'enum', enum: EmployeeRole })
    role!: EmployeeRole;
  
    @Column({ type: 'enum', enum: createEmployeeDto.EmployeeStatus })
    status!: createEmployeeDto.EmployeeStatus;
  
    @ManyToOne(() => Enterprise)
    @JoinColumn({ name: "enterprise_id" })
    enterprise!: Enterprise;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at!: string;

    @OneToOne(() => Photo)
    photo: Photo;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;
  }