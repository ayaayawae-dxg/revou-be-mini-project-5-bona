import { Consumer, Kafka, Producer } from "kafkajs";
import config from "../../config/config";

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
  producer = kafka.producer()
  consumer = kafka.consumer({ groupId: "bona-group-notifications" })

  await producer.connect()
  await consumer.connect()
  console.log(`Kafka connected successfully`);
  
  await consumer.subscribe({ topic: "dxg-digicamp-microservices-test", fromBeginning: true })
}

export { connectKafka, consumer, producer }