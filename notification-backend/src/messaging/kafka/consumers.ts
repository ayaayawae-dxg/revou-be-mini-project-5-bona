import { EachMessagePayload } from "kafkajs";
import { consumer } from "./kafkaConnection";
import notificationsConsumer from "../../domain/notifications/notifications.consumer";

const consumers = async () => {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      try {
        const payload = JSON.parse(message.value?.toString() || "");
        const { from, type, data } = payload;

        console.log(`======================================`);
        console.log(`topic name: ${topic}`);
        console.log(`topic payload: `, payload);

        if (from && from === "bona") {
          switch (type) {
            case "NOTIFICATION-ORDER_CREATED":
              notificationsConsumer.kafkaNotificationOrderCreate(data);
              break;
            default:
              break;
          }
        } else {
          console.log("not execute");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
};

export default consumers;
