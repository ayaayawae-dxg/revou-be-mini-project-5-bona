import { PoolConnection } from "mysql2/promise";

import config from "../../config/config";
import { createError } from "../../common/createError";

import { CreateProductsRequest, CreateProductsResponse } from "./products.model";
import productsRepository from "./products.repository";
import { channel } from "../../messaging/rabbitmq/rabbitmqConnection";

const create = async (
  connection: PoolConnection,
  createProductsRequest: CreateProductsRequest
): Promise<CreateProductsResponse> => {
  const orderId = await productsRepository.create(connection, createProductsRequest);

  return orderId;
};

export default {
  create,
};
