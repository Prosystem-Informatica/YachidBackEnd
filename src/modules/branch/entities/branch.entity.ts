import { BaseEntity } from "src/config/db/base.entity";
import { Address } from "src/modules/address/entities/address.entity";
import { Employee } from "src/modules/employee/entities/employee.entity";
import { Enterprise } from "src/modules/enterprise/entities/enterprise.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";


@Entity("branches")
export class Branch extends BaseEntity {

    @Column({ nullable: false })
    name!: string;

    @ManyToOne(() => Enterprise, (enterprise) => enterprise.branches)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise!: Enterprise;

    @OneToOne(() => Address, (address) => address.branch, { eager: true })
    address!: Address;

    @OneToMany(() => Employee, (employee) => employee.branch)
    employees!: Employee[];
}