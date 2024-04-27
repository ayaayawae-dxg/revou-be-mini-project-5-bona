import { PoolConnection } from "mysql2/promise";
import ordersRepository from "./products.repository";
import ordersService from "./products.service";

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
