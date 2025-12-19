export interface ICreateProductDTO {
  enterprise_id: number;
  category_id?: number;
  code: string;
  name: string;
  barcode?: string;
  unit?: string;
  manufacturer_id?: number;
  stock_location?: string;
  type?: string;
  weight_gross?: number;
  weight_net?: number;
  packaging?: string;
  stock_quantity?: number;
  stock_minimum?: number;
  stock_maximum?: number;
  active?: boolean;
}
