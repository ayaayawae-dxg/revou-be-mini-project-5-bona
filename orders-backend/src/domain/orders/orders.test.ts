import { PoolConnection } from "mysql2/promise";
import ordersRepository from "../orders/orders.repository";
import ordersService from "../orders/orders.service";

jest.mock("./orders.repository", () => ({
  create: jest.fn(),
  getOrderHistory: jest.fn(),
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
