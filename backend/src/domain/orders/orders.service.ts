import { PoolConnection } from "mysql2/promise";

import config from "../../config/config";
import { createError } from "../../common/createError";

import {
  CreateOrderModel,
  CreateOrderRequest,
  CreateOrderResponse,
} from "./orders.model";
import ordersRepository from "./orders.repository";

const create = async (
  connection: PoolConnection,
  createOrderRequest: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const { movie_id, show_time, seat_id, user_id } = createOrderRequest;


  const createOrderModel: CreateOrderModel = {
    screening_id: "1",
    seat_id: seat_id,
    user_id: user_id,
  };

  const orderId = await ordersRepository.create(connection, createOrderModel);

  return orderId;
};

export default {
  create
};
