import { NextFunction, Request, Response } from "express";

import pool from "../../config/db";
import { successRes } from "../../common/response";
import { createNextError } from "../../common/createError";

import { CreateProductsRequest } from "./products.model";
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
    await createNextError(connection, () => next(error));
  }
};

export default {
  create
};
