export interface ICreateCustomerDTO {
  name: string;
  email?: string | null;
  phone?: string | null;
  cnpj_cpf: string;
  enterprise_name: string;
  status: boolean;
  restriction: boolean;
  credit?: number | null;
  address?: string | null;
  person_type: "F" | "J";
  inscricao_estadual?: string | null;
}
