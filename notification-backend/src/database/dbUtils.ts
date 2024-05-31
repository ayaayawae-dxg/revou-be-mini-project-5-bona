import { RowDataPacket } from "mysql2";
import pool from "../config/database";

const checkDb = async () => {
  const [rows] = await pool.query<RowDataPacket[]>("select @@version");
  
  if (rows.length > 0) {
    console.log(`Database connected successfully`);
  } else {
    throw new Error("Failed to connect Database");
  }
};

export { checkDb }