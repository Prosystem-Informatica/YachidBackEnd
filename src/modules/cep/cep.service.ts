import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { CepLookupResponseDto } from './dto/cep-lookup-response.dto';

type ProviderName = 'viacep' | 'awesomeapi' | 'opencep';
type ProviderResult = {
  data?: CepLookupResponseDto;
  notFound?: boolean;
  provider: ProviderName;
};

@Injectable()
export class CepService {
  private readonly logger = new Logger(CepService.name);
  private readonly timeoutMs = 2000;

  async lookup(cep: string): Promise<CepLookupResponseDto> {
    const normalizedCep = this.normalizeCep(cep);

    const providers = [
      () => this.lookupViaCep(normalizedCep),
      () => this.lookupAwesomeApi(normalizedCep),
      () => this.lookupOpenCep(normalizedCep),
    ];

    let notFoundCount = 0;
    let errorsCount = 0;

    for (const providerCall of providers) {
      const result = await providerCall();

      if (result.data) {
        this.logger.log(
          `CEP ${normalizedCep} resolvido via provider ${result.provider}`,
        );
        return result.data;
      }

      if (result.notFound) {
        notFoundCount += 1;
      } else {
        errorsCount += 1;
      }
    }

    if (notFoundCount > 0 && errorsCount === 0) {
      throw new NotFoundException({
        code: 'not_found',
        message: 'CEP não encontrado',
      });
    }

    throw new ServiceUnavailableException({
      code: 'provider_unavailable',
      message: 'Não foi possível consultar os provedores de CEP',
    });
  }

  private normalizeCep(cep: string): string {
    const normalizedCep = (cep ?? '').replace(/\D/g, '');
    if (normalizedCep.length !== 8) {
      throw new BadRequestException({
        code: 'invalid_cep',
        message: 'CEP inválido. Deve conter 8 dígitos.',
      });
    }
    return normalizedCep;
  }

  private async lookupViaCep(cep: string): Promise<ProviderResult> {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
        timeout: this.timeoutMs,
      });
      const payload = response.data as Record<string, string | boolean>;

      if (payload?.erro === true) {
        return { notFound: true, provider: 'viacep' };
      }

      if (!payload?.logradouro || !payload?.localidade || !payload?.uf) {
        return { provider: 'viacep' };
      }

      return {
        provider: 'viacep',
        data: {
          cep: this.asString(payload.cep) ?? cep,
          logradouro: this.asString(payload.logradouro) ?? '',
          complemento: this.asString(payload.complemento) ?? '',
          bairro: this.asString(payload.bairro) ?? '',
          localidade: this.asString(payload.localidade) ?? '',
          uf: this.asString(payload.uf) ?? '',
          ibge: this.asString(payload.ibge),
          ddd: this.asString(payload.ddd),
          source: 'viacep',
        },
      };
    } catch (error) {
      return this.handleProviderError(error, 'viacep');
    }
  }

  private async lookupAwesomeApi(cep: string): Promise<ProviderResult> {
    try {
      const response = await axios.get(
        `https://cep.awesomeapi.com.br/json/${cep}`,
        { timeout: this.timeoutMs },
      );
      const payload = response.data as Record<string, string>;

      if (!payload?.address || !payload?.city || !payload?.state) {
        return { provider: 'awesomeapi' };
      }

      return {
        provider: 'awesomeapi',
        data: {
          cep: this.asString(payload.cep) ?? cep,
          logradouro: this.asString(payload.address) ?? '',
          complemento: '',
          bairro: this.asString(payload.district) ?? '',
          localidade: this.asString(payload.city) ?? '',
          uf: this.asString(payload.state) ?? '',
          ibge: this.asString(payload.city_ibge),
          ddd: this.asString(payload.ddd),
          source: 'awesomeapi',
        },
      };
    } catch (error) {
      return this.handleProviderError(error, 'awesomeapi');
    }
  }

  private async lookupOpenCep(cep: string): Promise<ProviderResult> {
    try {
      const response = await axios.get(`https://opencep.com/v1/${cep}`, {
        timeout: this.timeoutMs,
      });
      const payload = response.data as Record<string, string>;

      const logradouro =
        this.asString(payload.logradouro) ?? this.asString(payload.address) ?? '';
      const localidade =
        this.asString(payload.localidade) ?? this.asString(payload.city) ?? '';
      const uf = this.asString(payload.uf) ?? this.asString(payload.state) ?? '';

      if (!logradouro || !localidade || !uf) {
        return { provider: 'opencep' };
      }

      return {
        provider: 'opencep',
        data: {
          cep: this.asString(payload.cep) ?? cep,
          logradouro,
          complemento: this.asString(payload.complemento) ?? '',
          bairro:
            this.asString(payload.bairro) ?? this.asString(payload.district) ?? '',
          localidade,
          uf,
          ibge:
            this.asString(payload.ibge) ??
            this.asString(payload.codigo_ibge) ??
            undefined,
          ddd: this.asString(payload.ddd),
          source: 'opencep',
        },
      };
    } catch (error) {
      return this.handleProviderError(error, 'opencep');
    }
  }

  private handleProviderError(
    error: unknown,
    provider: ProviderName,
  ): ProviderResult {
    const isNotFound = this.isNotFound(error);

    if (!isNotFound) {
      const details =
        error instanceof Error ? error.message : 'erro desconhecido';
      this.logger.warn(
        `Falha ao consultar provider ${provider}: ${details}`,
      );
    }

    return { provider, notFound: isNotFound };
  }

  private isNotFound(error: unknown): boolean {
    if (!(error instanceof AxiosError)) {
      return false;
    }

    const status = error.response?.status;
    if (status === 404) {
      return true;
    }

    if (status === 400) {
      const code = this.asString(error.response?.data?.code);
      return code === 'not_found';
    }

    return false;
  }

  private asString(value: unknown): string | undefined {
    if (typeof value !== 'string') {
      return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length === 0 ? undefined : trimmed;
  }
}
