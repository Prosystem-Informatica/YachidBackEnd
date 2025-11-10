export interface ICreateEnterpriseDTO {
  name: string;
  email: string;
  password: string;
  status?: boolean;
  logo?: string;
  cnpj_cpf: string;
  branches?: string[] | null;
  phone?: string | null;
  certificate?: string | null;
  certificate_password?: string | null;
  enterprise_id?: number | null;
  csc_id?: string | null;
  csc_token?: string | null;
  environment?: "homologation" | "production";
}
