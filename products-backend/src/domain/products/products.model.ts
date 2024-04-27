export interface CreateProductsRequest {
  name: string;
  quantity: number;
  price: number;
}

export interface CreateProductsResponse {
  id: number;
}