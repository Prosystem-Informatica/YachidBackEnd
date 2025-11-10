export interface ICreateInvoiceDTO {
  enterprise_id: number;
  customer_id: number;
  model: "55" | "65";
  serie: string;
  number: number;
  items: {
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
    cfop: string;
    ncm: string;
  }[];
}
