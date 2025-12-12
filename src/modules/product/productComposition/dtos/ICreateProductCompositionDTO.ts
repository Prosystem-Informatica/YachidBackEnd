export interface ICreateProductCompositionDTO {
  name: string;
  description?: string;
  quantity: number;
  component_cost: number;
  active?: boolean;
}
