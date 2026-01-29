import { BaseEntity } from 'src/config/db/base.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { EnterpriseRegime } from '../dto/tax-regime.dto';
import { Branch } from 'src/modules/branch/entities/branch.entity';

@Entity('tax_regimes')
export class TaxRegime extends BaseEntity{

    @Column()
    tax_regime: EnterpriseRegime;
    
    @Column()
    regime_tributario_issqn: string;
    
    @Column()
    ind_rat_issqn: string;

    @OneToOne(() => Branch)
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;
     
}