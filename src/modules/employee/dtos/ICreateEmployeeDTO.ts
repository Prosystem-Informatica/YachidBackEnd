export interface ICreateEmployeeDTO {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  cnpj_cpf?: string | null;
  enterprise_name: string;
  status: boolean;
  role: string;
}
