import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGroupEnterpriseDto {
  @IsNotEmpty({ message: 'groupId é obrigatório' })
  @IsUUID()
  groupId!: string;

  @IsNotEmpty({ message: 'enterpriseId é obrigatório' })
  @IsUUID()
  enterpriseId!: string;
}
