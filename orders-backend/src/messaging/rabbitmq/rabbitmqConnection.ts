import { Channel, Connection, connect } from "amqplib";
import config from "../../config/config";

let connection: Connection, channel: Channel;

const connectQueue = async () => {
  try {
    connection = await connect(config.rabbitmq_host as string);
    channel = await connection.createChannel();
    channel.prefetch(1);

    console.log(`RabbitMQ connected successfully`);
    await channel.assertQueue("orders-queue");
  } catch (error) {
    console.log("RabbitMQ failed to connect", error);
  }
};

export { connectQueue, connection, channel }