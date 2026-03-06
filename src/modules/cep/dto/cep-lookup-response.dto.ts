export class CepLookupResponseDto {
  cep!: string;
  logradouro!: string;
  complemento?: string;
  bairro!: string;
  localidade!: string;
  uf!: string;
  ibge?: string;
  ddd?: string;
  source!: 'viacep' | 'awesomeapi' | 'opencep';
}
