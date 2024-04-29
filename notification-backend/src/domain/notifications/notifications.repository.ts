import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";

import { createError } from "../../common/createError";
import { CreateNotificationsResponse } from "./notifications.model";
import { randomUUID } from "crypto";

const create = async (connection: PoolConnection, message: string): Promise<CreateNotificationsResponse> => {
  const id = randomUUID();

  const query = `
    INSERT INTO notifications (id, message) 
    VALUES ("${id}", "${message}");
  `;
  const [rows] = await connection.query<ResultSetHeader>(query);

  return { id };
};

export default {
  create
};
