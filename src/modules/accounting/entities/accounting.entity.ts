import { Enterprise } from 'src/modules/enterprise/entities/enterprise.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('accounting')
export class Accounting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    contabilidade: string;

    @Column()
    cnpj: string;

    @Column()
    cep: string;

    @Column()
    endereco: string;

    @Column()
    bairro: string;

    @Column()
    numero: string;

    @Column()
    cidade: string;

    // @OneToOne(() => Enterprise, (enterprise) => enterprise.accounting)
    // @JoinColumn({ name: 'enterprise_id' })
    // enterprise!: Enterprise;

}