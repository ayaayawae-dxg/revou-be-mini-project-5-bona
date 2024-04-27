import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";

import { createError } from "../../common/createError";
import { CreateOrderRequest, CreateOrderResponse } from "../orders/orders.model";
import { randomUUID } from "crypto";

const create = async (connection: PoolConnection, createOrderRequest: CreateOrderRequest): Promise<CreateOrderResponse> => {
  const id = randomUUID();
  const { product_id, quantity, user_id } = createOrderRequest;

  const query = `
    INSERT INTO orders (id, user_id, product_id, quantity) 
    VALUES ("${id}", ${user_id}, ${product_id}, ${quantity});
  `;
  const [rows] = await connection.query<ResultSetHeader>(query);
  
  return { id };
};

export default {
  create
};
