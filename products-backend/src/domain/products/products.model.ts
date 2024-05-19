export interface CreateProductsRequest {
  name: string;
  quantity: number;
  price: number;
}

export interface CreateProductsResponse {
  id: number;
}

export interface ProductAvailabilityRequest {
  product_id: number;
  quantity: number;
}

export interface checkAvailabilityProductsResponse {
  product_id: number;
  available: boolean;
  quantity: number;
}

export interface ProductReduceStockRequest {
  product_id: number;
  quantity: number;
}