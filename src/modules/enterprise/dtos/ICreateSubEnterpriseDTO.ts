export interface ICreateSubEnterpriseDTO {
  enterpriseId: number;
  name: string;
  cnpj_cpf: string;

  address?: {
    xLgr: string;
    nro: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    UF: string;
    CEP: string;
    cPais: string;
    xPais: string;
  } | null;

  tipo_regime?: string | null;
  codigo_cidade?: string | null;
  inscricao_estadual?: string | null;
  inscricao_municipal?: string | null;

  contabilidade?: {
    contabilidade: string;
    cnpj: string;
    cep: string;
    endereco: string;
    bairro: string;
    numero: string;
    cidade: string;
  } | null;

  receita?: {
    regime_tributario_issqn?: string;
    ind_ret_issqn?: string;
    receita_bruta_12m?: number;
    aliquota?: number;
    pis?: number;
    cofins?: number;
    icms?: number;
    ibc_uf?: number;
    ibs_mun?: number;
    cbs?: number;
  } | null;
}
