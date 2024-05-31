import { Channel, Connection, connect } from "amqplib";
import config from "../../config/config";
import rabbitMQConsumersListeners from "./consumers";

let connection: Connection, channel: Channel;

const connectRabbitQueue = async () => {
  try {
    connection = await connect(config.rabbitmq_host as string);
    channel = await connection.createChannel();
    channel.prefetch(1);

    await channel.assertQueue("product-availability-request");
    await channel.assertQueue("product-reduce-stock-request");
    
    rabbitMQConsumersListeners()
    console.log(`RabbitMQ connected successfully`);
  } catch (error) {
    console.log("RabbitMQ failed to connect", error);
  }
};

export { connectRabbitQueue, connection, channel }