import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";

import { createError } from "../../common/createError";
import { CreateProductsRequest, CreateProductsResponse, ProductAvailabilityRequest } from "./products.model";
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

const checkAvailability = async (connection: PoolConnection, productAvailabilityRequest: ProductAvailabilityRequest): Promise<boolean> => {
  const { product_id, quantity } = productAvailabilityRequest;
  
  const query = `
    SELECT name, quantity 
    FROM products 
    WHERE id = ${product_id} AND quantity >= ${quantity} FOR UPDATE;
  `;
  const [rows] = await connection.query<RowDataPacket[]>(query);

  return rows.length > 0 ? true : false;
};

const reduceStock = async (connection: PoolConnection, productAvailabilityRequest: ProductAvailabilityRequest): Promise<boolean> => {
  const { product_id, quantity } = productAvailabilityRequest;
  let query

  query = `
    SELECT name, quantity 
    FROM products 
    WHERE id = ${product_id} FOR UPDATE
  `
  const lockResponse = await connection.query<RowDataPacket[]>(query);
  if (lockResponse[0].length === 0) {
    return false
  }

  query = `
    UPDATE products
    SET quantity = quantity - ${quantity}
    WHERE id = ${product_id}
  `;
  const [rows] = await connection.query<ResultSetHeader>(query);

  return rows.affectedRows === 1 ? true : false;
};

export default {
  create,
  checkAvailability,
  reduceStock
};
