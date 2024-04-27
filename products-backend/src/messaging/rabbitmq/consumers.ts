import { channel } from "./rabbitmqConnection"
import productsConsumer from "../../domain/products/products.consumer"

const consumers = () => {
  try {
    channel.consume("product-availability-requests", productsConsumer.productAvailabilityRequests)
  } catch (error) {
    console.log(error);
  }
}

export default consumers