import { ConsumeMessage, Message } from "amqplib";

import pool from "../../config/db";
import { channel } from "../../messaging/rabbitmq/rabbitmqConnection";
import {
  ProductAvailabilityRequest,
  ProductReduceStockRequest,
} from "./products.model";
import productsRepository from "./products.repository";

// ========= RABBITMQ =========
const productAvailabilityRequest = async (data: ConsumeMessage | null) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
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

      channel.sendToQueue(data.properties.replyTo, Buffer.from(payload));
      channel.ack(data);
    }
    await connection.commit();
  } catch (error) {
    console.log(error);
    channel.reject(data as Message, false);
    await connection.rollback();
  } finally {
    connection.release();
  }
};

const productReduceStockRequest = async (data: ConsumeMessage | null) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

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

      channel.ack(data);
    }
    await connection.commit();
  } catch (error) {
    console.log(error);
    channel.reject(data as Message, false);
    await connection.rollback();
  } finally {
    connection.release();
  }
};

// ========= KAFKA =========
const kafkaProductReduceStockRequest = async (
  data: ProductReduceStockRequest
) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    const isReduceSuccess = await productsRepository.reduceStock(
      connection,
      data
    );
    if (!isReduceSuccess) {
      console.log("Failed to reduce stock");
    }

    await connection.commit();
  } catch (error) {
    console.log(error);
    await connection.rollback();
  } finally {
    connection.release();
  }
};

export default {
  productAvailabilityRequest,
  productReduceStockRequest,
  kafkaProductReduceStockRequest,
};
