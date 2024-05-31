import { PoolConnection } from "mysql2/promise";

import config from "../../config/config";
import { createError } from "../../common/createError";

import { CreateOrderRequest, CreateOrderResponse } from "./orders.model";
import ordersRepository from "./orders.repository";
import {
  channel,
  connection as rabbitmqConnection,
} from "../../messaging/rabbitmq/rabbitmqConnection";
import ordersConsumer from "./orders.consumer";
import { randomUUID } from "crypto";
import kafkaPublisher from "../../messaging/kafka/publisher";
import productsService from "../../services/products";

// ========== RABBITMQ ==========
const create = async (
  connection: PoolConnection,
  createOrderRequest: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const { user_id, product_id, quantity } = createOrderRequest;
  const replyToQueue = await channel.assertQueue("", { exclusive: true });

  channel.sendToQueue(
    "product-availability-request",
    Buffer.from(JSON.stringify(createOrderRequest)),
    { replyTo: replyToQueue.queue }
  );

  const productAvailability = await ordersConsumer.productAvailability(
    replyToQueue.queue
  );
  if (!productAvailability.available) {
    createError({ message: "Product is out of stock", status: 200 });
  }

  channel.sendToQueue(
    "product-reduce-stock-request",
    Buffer.from(JSON.stringify(createOrderRequest))
  );
  
  // send notification
  channel.sendToQueue(
    "notification-order-create",
    Buffer.from(JSON.stringify(createOrderRequest))
  );

  const orderId = await ordersRepository.create(connection, createOrderRequest);

  return orderId;
};

// ========== KAFKA ==========
const kafkaCreate = async (
  connection: PoolConnection,
  createOrderRequest: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const { user_id, product_id, quantity } = createOrderRequest;

  const checkProductAvailability = await productsService.checkProductAvailability(product_id, quantity)
  if (!checkProductAvailability.data.available) {
    createError({ message: "Product is out of stock", status: 200 });
  }

  kafkaPublisher("dxg-digicamp-microservices-test", {
    from: "bona",
    type: "PRODUCT-REDUCE_STOCK",
    data: createOrderRequest,
  });

  kafkaPublisher("dxg-digicamp-microservices-test", {
    from: "bona",
    type: "NOTIFICATION-ORDER_CREATED",
    data: createOrderRequest,
  });

  const orderId = await ordersRepository.create(connection, createOrderRequest);

  return orderId;
};

export default {
  create,
  kafkaCreate,
};
