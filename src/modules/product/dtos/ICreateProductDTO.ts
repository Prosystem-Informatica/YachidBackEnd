export interface ICreateProductDTO {
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  cfop: number;
  ncm: number;
  category?: string | null;
}
