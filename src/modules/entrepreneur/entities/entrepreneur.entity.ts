import { BaseEntity } from "src/config/db/base.entity";
import { EmployeeStatus } from "src/modules/employee/dto/create-employee.dto";
import { Enterprise } from "src/modules/enterprise/entities/enterprise.entity";
import { Photo } from "src/modules/photos/entities/photo.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('entrepreneurs')
export class Entrepreneur extends BaseEntity{

    @Column()
    name!: string;
  
    @Column()
    phone!: string;
  
    @Column()
    document!: string;
  
    @Column({ type: 'enum', enum: EmployeeStatus })
    status!: EmployeeStatus;

    @OneToMany(() => Enterprise, (enterprise) => enterprise.entrepreneur)
    enterprises!: Enterprise[];

    @OneToOne(() => Photo)
    photo: Photo;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;
}