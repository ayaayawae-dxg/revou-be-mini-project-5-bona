import { PoolConnection } from "mysql2/promise";

import config from "../../config/config";
import { createError } from "../../common/createError";

import { CreateOrderRequest, CreateOrderResponse } from "./orders.model";
import ordersRepository from "./orders.repository";
import { channel, connection as rabbitmqConnection } from "../../messaging/rabbitmq/rabbitmqConnection";
import ordersConsumer from "./orders.consumer";
import { randomUUID } from "crypto";

const create = async (
  connection: PoolConnection,
  createOrderRequest: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const { user_id, product_id, quantity } = createOrderRequest;
  const replyToQueue = await channel.assertQueue('', { exclusive: true });

  channel.sendToQueue(
    "product-availability-request",
    Buffer.from(JSON.stringify(createOrderRequest)),
    { replyTo: replyToQueue.queue }
  );

  const productAvailability = await ordersConsumer.productAvailability(replyToQueue.queue)
  if (!productAvailability.available) {
    return createError({ message: "Product is out of stock", status: 200 })
  }

  channel.sendToQueue(
    "product-reduce-stock-request",
    Buffer.from(JSON.stringify(createOrderRequest)),
  );

  const orderId = await ordersRepository.create(connection, createOrderRequest);

  // send notification
  channel.sendToQueue(
    "notification-order-create",
    Buffer.from(JSON.stringify(createOrderRequest)),
  );

  return orderId;
};

export default {
  create,
};
