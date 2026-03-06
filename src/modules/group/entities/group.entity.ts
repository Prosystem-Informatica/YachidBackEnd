import { BaseEntity } from 'src/config/db/base.entity';
import { GroupEnterprise } from 'src/modules/group-enterprise/entity/group-enterprise.entity';
import { Partner } from 'src/modules/partner/entity/partner.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('groups')
export class Group extends BaseEntity {
  @Column({ nullable: false })
  name!: string;

  @OneToMany(
    () => GroupEnterprise,
    (groupEnterprise) => groupEnterprise.group,
  )
  groupEnterprises!: GroupEnterprise[];

  @OneToMany(() => Partner, (partner) => partner.group)
  partners!: Partner[];
}
