import { Channel, Connection, connect } from "amqplib";
import config from "../../config/config";

let connection: Connection, channel: Channel;

const connectQueue = async () => {
  connection = await connect(config.rabbitmq_host as string);
  channel = await connection.createChannel();

  console.log(`RabbitMQ connected successfully`);
  await channel.assertQueue("orders-queue");
};

export { connectQueue, connection, channel }