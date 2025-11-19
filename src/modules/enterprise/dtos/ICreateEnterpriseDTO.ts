export interface ICreateEnterpriseDTO {
  name: string;
  email: string;
  password: string;
  status?: boolean;
  logo?: string;
  cnpj_cpf: string;
  branches?: string[] | null;
  phone?: string | null;
  cert_filename?: string | null;
  cert_password?: string | null;
  csc_id?: string | null;
  csc_token?: string | null;
  address?: string | null;
  environment?: "homologation" | "production";
}
