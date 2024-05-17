import { channel } from "./rabbitmqConnection"
import productsConsumer from "../../domain/products/products.consumer"

const consumers = () => {
  // channel.consume("product-availability-request", productsConsumer.productAvailabilityRequest);
  // channel.consume("product-reduce-stock-request", productsConsumer.productReduceStockRequest);
}

export default consumers