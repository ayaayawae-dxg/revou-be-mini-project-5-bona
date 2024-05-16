import "dotenv/config";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import path from "path";
import cors from "cors";

import routes from "./routes";
import log from "./middleware/log";
import { errorRes } from "./common/response";
import config from "./config/config";
import { checkDb } from "./database/dbUtils";

import { connectRabbitQueue } from "./messaging/rabbitmq/rabbitmqConnection";
import { connectKafka } from "./messaging/kafka/kafkaConnection";
import rabbitmqConsumers  from "./messaging/rabbitmq/consumers";
import kafkaConsumers from "./messaging/kafka/consumers";

const app = express();
const apiSpec = path.join(__dirname, "../api.yaml");

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(log);
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true, // (default)
    validateResponses: false, // false by default
  })
);
app.use("/spec", express.static(apiSpec));

app.use("/", routes);

app.use(errorRes);

const start = async () => {
  try {
    await checkDb();
    await connectRabbitQueue().then(rabbitmqConsumers);
    await connectKafka().then(kafkaConsumers)

    app.listen(config.port as number, config.host, () => {
      console.log(`Products service is running on ${config.host}:${config.port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
