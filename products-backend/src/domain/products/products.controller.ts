import { NextFunction, Request, Response } from "express";

import pool from "../../config/db";
import { successRes } from "../../common/response";
import { onError } from "../../common/createError";

import { ProductAvailabilityRequest, CreateProductsRequest } from "./products.model";
import productsService from "./products.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const createProductsRequest = {
      ...req.body,
    } as CreateProductsRequest;
    const createOrderResponse = await productsService.create(connection, createProductsRequest);

    await successRes(connection, res, {
      message: "products created successfully",
      status: 201,
      data: createOrderResponse,
    });
  } catch (error) {
    await onError(connection, () => next(error));
  }
};

const checkAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const connection = await pool.getConnection();
  try {
    const checkAvailabilityProductsRequest = req.query as unknown as ProductAvailabilityRequest
    const checkAvailabilityProductsResponse = await productsService.checkAvailability(connection, checkAvailabilityProductsRequest);

    await successRes(connection, res, {
      message: "check availability products successfully",
      status: 200,
      data: checkAvailabilityProductsResponse,
    });
  } catch (error) {
    await onError(connection, () => next(error));
  }
};

export default {
  create,
  checkAvailability
};
