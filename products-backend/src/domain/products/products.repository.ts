import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";

import { createError } from "../../common/createError";
import { CreateProductsRequest, CreateProductsResponse } from "./products.model";
import { randomUUID } from "crypto";

const create = async (connection: PoolConnection, createProductsRequest: CreateProductsRequest): Promise<CreateProductsResponse> => {
  const { name, quantity, price } = createProductsRequest;

  const query = `
    INSERT INTO products (name, quantity, price) 
    VALUES ("${name}", ${quantity}, ${price});
  `;
  const [rows] = await connection.query<ResultSetHeader>(query);

  return { id: rows.insertId };
};

export default {
  create
};
