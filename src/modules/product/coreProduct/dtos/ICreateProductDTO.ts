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
  cost_price?: number;
  profit_margin?: number;
  sale_price?: number;
  fiscal?: Record<string, any> | null;
  prices?: Record<string, any>[] | null;
  images?: Record<string, any>[] | null;
  compositions?: Record<string, any>[] | null;
  active?: boolean;
}
