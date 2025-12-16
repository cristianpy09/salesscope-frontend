export interface WeeklySalesResponse {
  message: string;
  data: WeeklySale[];
}
export interface WeeklySale {
  week: string;        
  units_sold: number;
  revenue: number;
}
export interface TopProduct {
  product_id: number;
  name: string;
  total_sold: number;
}
export interface TopProductsResponse {
  message: string;
  data: TopProduct[];
}
