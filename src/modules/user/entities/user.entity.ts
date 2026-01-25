import { BaseEntity } from "src/config/db/base.entity";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ENTREPRENEUR = 'entrepreneur',
    EMPLOYEE = 'employee',
}

@Entity('users')
export class User extends BaseEntity{
  
    @Column({ unique: true })
    email!: string;
  
    @Column()
    password!: string;

    @Column({ type: 'enum', enum: UserRole })
    role!: UserRole;
}