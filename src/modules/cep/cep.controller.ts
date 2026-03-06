import { Controller, Get, Param } from '@nestjs/common';
import { CepService } from './cep.service';
import { CepLookupResponseDto } from './dto/cep-lookup-response.dto';

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  async lookup(@Param('cep') cep: string): Promise<CepLookupResponseDto> {
    return this.cepService.lookup(cep);
  }
}
