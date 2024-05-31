import { Consumer, Kafka, Producer } from "kafkajs";
import config from "../../config/config";
import kafkaConsumersListeners from "./consumers";

const kafka = new Kafka({
  clientId: config.kafka_resource,
  brokers: [config.kafka_server],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: config.kafka_key,
    password: config.kafka_secret,
  },
})

let consumer: Consumer, producer: Producer

const connectKafka = async () => {
  try {
    producer = kafka.producer()
    consumer = kafka.consumer({ groupId: "bona-group-notifications" })

    await producer.connect()
    await consumer.connect()

    await consumer.subscribe({ topic: "dxg-digicamp-microservices-test", fromBeginning: true })
    await kafkaConsumersListeners()
    
    console.log(`Kafka connected successfully`);
  } catch (error) {
    console.log("Kafka failed to connect", error);
  }
}

export { connectKafka, consumer, producer }