import { channel } from "./rabbitmqConnection"
import notificationsConsumer from "../../domain/notifications/notifications.consumer"

const consumers = () => {
  channel.consume("notification-order-create", notificationsConsumer.notificationOrderCreate);
}

export default consumers