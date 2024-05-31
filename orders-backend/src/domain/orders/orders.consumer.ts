import { ConsumeMessage } from "amqplib";

import pool from "../../config/database";
import { channel } from "../../messaging/rabbitmq/rabbitmqConnection";
import { ProductAvailability } from "./orders.model";

const productAvailability = async (queue: string): Promise<ProductAvailability> => {
  return new Promise((resolve, reject) => {
    channel.consume(
      queue,
      (data) => {
        if (data) {
          const response = JSON.parse(data.content.toString())
          resolve(response);
          channel.deleteQueue(queue)
        } else {
          reject()
        }
      },
      { noAck: true }
    );
  });
}

export default {
  productAvailability,
};
