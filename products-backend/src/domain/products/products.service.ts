import { PoolConnection } from "mysql2/promise";

import config from "../../config/config";
import { createError } from "../../common/createError";

import { checkAvailabilityProductsResponse, CreateProductsRequest, CreateProductsResponse, ProductAvailabilityRequest } from "./products.model";
import productsRepository from "./products.repository";
import { channel } from "../../messaging/rabbitmq/rabbitmqConnection";

const create = async (
  connection: PoolConnection,
  createProductsRequest: CreateProductsRequest
): Promise<CreateProductsResponse> => {
  const orderId = await productsRepository.create(connection, createProductsRequest);

  return orderId;
};

const checkAvailability = async (
  connection: PoolConnection,
  productAvailabilityRequest: ProductAvailabilityRequest
): Promise<checkAvailabilityProductsResponse> => {
  const isProductAvailable = await productsRepository.checkAvailability(connection, productAvailabilityRequest);

  const payload = {
    product_id: productAvailabilityRequest.product_id,
    available: isProductAvailable,
    quantity: productAvailabilityRequest.quantity
  };

  return payload;
};

export default {
  create,
  checkAvailability
};
