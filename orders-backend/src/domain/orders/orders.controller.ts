import { NextFunction, Request, Response } from "express";

import pool from "../../config/database";
import { successRes } from "../../common/response";
import { onError } from "../../common/createError";

import { CreateOrderRequest } from "./orders.model";
import ordersService from "./orders.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const useKafka = req.path.includes("kafka");

    const createOrderRequest = {
      ...req.body,
      // user_id: req.app.locals.user.id,
    } as CreateOrderRequest;
    const createOrderResponse = useKafka
      ? await ordersService.kafkaCreate(connection, createOrderRequest)
      : await ordersService.create(connection, createOrderRequest);

    await successRes(connection, res, {
      message: "Orders created successfully",
      status: 201,
      data: createOrderResponse,
    });
  } catch (error) {
    await onError(connection, () => next(error));
  }
};

export default {
  create,
};
