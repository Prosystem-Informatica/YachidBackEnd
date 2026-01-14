export interface ICreateEmployeeDTO {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  cnpj_cpf?: string | null;
  enterpriseId: number;
  subEnterpriseIds?: number[];
  status?: boolean;
  role: string;
}
