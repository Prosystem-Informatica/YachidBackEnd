import { BaseEntity } from 'src/config/db/base.entity';
import { Enterprise } from 'src/modules/enterprise/entities/enterprise.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Entity('group_enterprises')
@Unique(['group', 'enterprise'])
export class GroupEnterprise extends BaseEntity {
  @ManyToOne(() => Group, (group) => group.groupEnterprises, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.groupEnterprises, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enterprise_id' })
  enterprise!: Enterprise;
}
