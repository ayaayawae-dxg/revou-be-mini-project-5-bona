import { ConsumeMessage, Message } from "amqplib";

import pool from "../../config/db";
import { channel } from "../../messaging/rabbitmq/rabbitmqConnection";
import { ProductAvailabilityRequest, ProductReduceStockRequest } from "./products.model";
import productsRepository from "./products.repository";

const productAvailabilityRequest = async (data: ConsumeMessage | null) => {
  const connection = await pool.getConnection();
  try {
    if (data) {
      const requestData = JSON.parse(
        data.content.toString()
      ) as ProductAvailabilityRequest;
      const { product_id } = requestData;

      const isProductAvailable = await productsRepository.checkAvailability(
        connection,
        requestData
      );
      const payload = JSON.stringify({
        product_id,
        available: isProductAvailable,
      });

      channel.sendToQueue(
        data.properties.replyTo,
        Buffer.from(payload),
      );
      channel.ack(data)
    }
  } catch (error) {
    console.log(error);
    channel.reject(data as Message, false)
  } finally {
    connection.release()
  }
};

const productReduceStockRequest = async (data: ConsumeMessage | null) => {
  const connection = await pool.getConnection();
  try {
    if (data) {
      const requestData = JSON.parse(
        data.content.toString()
      ) as ProductReduceStockRequest;

      const isReduceSuccess = await productsRepository.reduceStock(
        connection,
        requestData
      );
      if (!isReduceSuccess) {
        console.log("Failed to reduce stock");
      }

      channel.ack(data)
    }
  } catch (error) {
    console.log(error);
    channel.reject(data as Message, false)
  } finally {
    connection.release()
  }
};

export default {
  productAvailabilityRequest,
  productReduceStockRequest
};
