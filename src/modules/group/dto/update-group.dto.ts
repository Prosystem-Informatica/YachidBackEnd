import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateGroupDto {
  @IsNotEmpty({ message: 'enterpriseId é obrigatório' })
  @IsUUID()
  enterpriseId!: string;
}
