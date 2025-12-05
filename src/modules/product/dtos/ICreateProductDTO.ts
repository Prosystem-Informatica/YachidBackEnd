export interface ICreateProductDTO {
  cProd: string;
  name: string;
  description?: string | null;
  category?: string | null;
  ncm: string;
  cest?: string | null;
  cfop: string;
  uCom?: string;
  uTrib?: string;
  cEAN?: string;
  cEANTrib?: string;
  cst?: string;
  orig?: string;
  icms_rate?: number;
  ipi_rate?: number;
  pis_rate?: number;
  cofins_rate?: number;
  pCredSN?: number;
  vCredICMSSN?: number;
  price: number;
  quantity: number;
  enterprise_id: number;
  cost_price: number;
  profit_margin: number;
  status?: boolean;
  profit_value: number;
}
