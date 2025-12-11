export interface IUpdateProductDTO {
  id: number;
  enterprise_id?: number;
  category_id?: number;
  code?: string;
  name?: string;
  description?: string | null;
  barcode?: string;
  unit?: string;
  manufacturer_id?: number;
  classification?: string;
  weight_gross?: number;
  weight_net?: number;
  packaging?: string;
  stock_quantity?: number;
  stock_minimum?: number;
  stock_maximum?: number;
  active?: boolean;
}
