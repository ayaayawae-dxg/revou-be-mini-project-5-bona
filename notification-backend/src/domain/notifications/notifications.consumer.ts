import { ConsumeMessage, Message } from "amqplib";

import pool from "../../config/db";
import { channel } from "../../messaging/rabbitmq/rabbitmqConnection";
import { CreateNotifications } from "./notifications.model";
import notificationsRepository from "./notifications.repository";

// ========== RABBITMQ ==========
const notificationOrderCreate = async (data: ConsumeMessage | null) => {
  const connection = await pool.getConnection();
  try {
    if (data) {
      const requestData = JSON.parse(
        data.content.toString()
      ) as CreateNotifications;
      const { product_id, quantity, user_id } = requestData;

      setTimeout(async () => {
        const message = `New order | User ${user_id} | Product ${product_id} @ ${quantity}`;
        await notificationsRepository.create(connection, message);

        console.log(`New notification: ${message}`);

        channel.ack(data);
      }, 5000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.release();
  }
};

// ========== KAFKA ==========
const kafkaNotificationOrderCreate = async (data: CreateNotifications) => {
  const connection = await pool.getConnection();
  try {
    if (data) {
      const { product_id, quantity, user_id } = data;

      setTimeout(async () => {
        const message = `New order | User ${user_id} | Product ${product_id} @ ${quantity}`;
        await notificationsRepository.create(connection, message);
        console.log(`New notification: ${message}`);
      }, 5000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.release();
  }
};

export default {
  notificationOrderCreate,
  kafkaNotificationOrderCreate,
};
