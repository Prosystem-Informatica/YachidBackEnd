
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 8 })
    cep: string;

    @Column({nullable: false})
    street: string;

    @Column({nullable: false})
    number: string;

    @Column({nullable: true})
    complement: string;

    @Column({nullable: false})
    neighborhood: string;

    @Column({nullable: false})
    city: string;

    @Column({nullable: false})
    city_ibge_code: string;

    @Column({nullable: false})
    country: string;

    @Column({nullable: false})
    state: string;

    @Column({nullable: false})
    uf: string;

}

