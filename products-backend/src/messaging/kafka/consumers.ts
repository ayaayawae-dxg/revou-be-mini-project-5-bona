import { EachMessagePayload } from "kafkajs";
import { consumer } from "./kafkaConnection";
import productsConsumer from "../../domain/products/products.consumer";

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
            case "PRODUCT-REDUCE_STOCK":
              productsConsumer.productReduceStockRequest(data);
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
