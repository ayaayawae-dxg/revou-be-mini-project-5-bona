import { producer } from "./kafkaConnection";

const publisher = async (topic: string = 'dxg-digicamp-microservices-test', message: object | undefined) => {
  producer.send({
    topic: topic,
    messages: [
      { value: Buffer.from(JSON.stringify(message)) },
    ],
  })
};

export default publisher;
