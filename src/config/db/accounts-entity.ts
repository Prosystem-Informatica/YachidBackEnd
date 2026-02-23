import { Column } from "typeorm";
import { BaseEntity } from "./base.entity";
export class AccountsEntity extends BaseEntity{
    @Column()
    saldo_devedor: string;

    @Column()
    maior_atraso: string;

    @Column()
    maior_fat: Date;

    @Column()
    valor_maior_atraso: string;

    @Column()
    primeira_compra: Date;

    @Column()
    valor_primeira_compra: string;

    @Column()
    ultima_compra: Date;

    @Column()
    valor_ultima_compra: string;

    @Column()
    atrasadas: string;

    @Column()
    cartorio: string;

    @Column()
    protesto: string;

    @Column()
    normal: string;

    @Column()
    observation: string;
}