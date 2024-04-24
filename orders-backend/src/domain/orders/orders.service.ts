import { PoolConnection } from "mysql2/promise";

import config from "../../config/config";
import { createError } from "../../common/createError";

import {
  CreateOrderRequest,
  CreateOrderResponse,
} from "./orders.model";
import ordersRepository from "./orders.repository";

const create = async (
  connection: PoolConnection,
  createOrderRequest: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const { user_id, product_id, quantity } = createOrderRequest;


  const createOrderModel: CreateOrderRequest = {
    product_id: 1,
    quantity: 2,
    user_id: 1
  }

  const orderId = await ordersRepository.create(connection, createOrderModel);

  return orderId;
};

export default {
  create
};
