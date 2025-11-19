export interface ICreateProductDTO {
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  cfop: string;
  ncm: string;
  category?: string | null;
  enterprise_id: number;
}
