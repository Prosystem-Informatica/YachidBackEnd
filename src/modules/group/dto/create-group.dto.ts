import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty({ message: 'Nome do grupo é obrigatório' })
  @IsString()
  name!: string;
}
