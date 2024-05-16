import { EachMessagePayload } from "kafkajs";
import { consumer } from "./kafkaConnection";

const consumers = async () => {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      console.log("topic: ", topic);
      console.log("partition: ", partition);
      console.log("message: ", message);
      
      console.log(message.value);
    },
  });
};

export default consumers;
