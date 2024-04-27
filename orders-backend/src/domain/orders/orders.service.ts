import { PoolConnection } from "mysql2/promise";

import config from "../../config/config";
import { createError } from "../../common/createError";

import { CreateOrderRequest, CreateOrderResponse } from "./orders.model";
import ordersRepository from "./orders.repository";
import { channel } from "../../messaging/rabbitmq/rabbitmqConnection";

const create = async (
  connection: PoolConnection,
  createOrderRequest: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const { user_id, product_id, quantity } = createOrderRequest;
  channel.sendToQueue("product-availability-requests", Buffer.from(JSON.stringify(createOrderRequest)));

  const orderId = await ordersRepository.create(connection, createOrderRequest);

  return orderId;
};

export default {
  create,
};
