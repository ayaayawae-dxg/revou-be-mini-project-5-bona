export interface CreateOrderRequest {
  product_id: number;
  quantity: number;
  user_id: number;
}

export interface CreateOrderResponse {
  id: string;
}

export interface ProductAvailability {
  product_id: number;
  available: boolean;
}