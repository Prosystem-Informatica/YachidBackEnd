export interface IUpdateProductDTO {
  id: number;
  enterprise_id?: number;
  category_id?: number;
  code?: string;
  name?: string;
  barcode?: string;
  stock_location?: string;
  type?: string;
  unit?: string;
  manufacturer_id?: number;
  weight_gross?: number;
  weight_net?: number;
  packaging?: string;
  stock_quantity?: number;
  stock_minimum?: number;
  stock_maximum?: number;
  active?: boolean;
}
