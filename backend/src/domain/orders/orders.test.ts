import { PoolConnection } from "mysql2/promise";
import ordersRepository from "../orders/orders.repository";
import ordersService from "../orders/orders.service";
import { GetOrderHistoryResponse } from "./orders.model";

jest.mock("./orders.repository", () => ({
  create: jest.fn(),
  getOrderHistory: jest.fn(),
}));

jest.mock("../screening/screening.repository", () => ({
  getByMovieAndTime: jest.fn(),
  checkSeat: jest.fn(),
}));

describe("orders service", () => {
  let connection: PoolConnection;

  beforeEach(() => {
    connection = {} as PoolConnection;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    
  });
});
