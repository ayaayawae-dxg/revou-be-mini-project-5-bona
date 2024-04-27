import { ConsumeMessage } from "amqplib";
import { channel } from "../../messaging/rabbitmq/rabbitmqConnection";

const productAvailabilityRequests = (data: ConsumeMessage | null) => {
  if (data) {
    const payload = JSON.parse(data.content.toString());
    channel.ack(payload)
  }
}

export default {
  productAvailabilityRequests
}