import { Employee } from "src/modules/employee/entities/employee.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity('photos')
export class Photo {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    base64: string;

    @OneToOne(() => Employee, (employee) => employee.photo)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

}

