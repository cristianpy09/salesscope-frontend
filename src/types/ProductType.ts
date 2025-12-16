export interface Product {
  product_id: number;
  name: string;
  description: string;
  category:string
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}


export interface ProductsResponse {
  message: string;
  data: Product[];
}
