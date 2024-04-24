import { Router } from "express";

import appRoute from "./domain/app/app.route";
import ordersRoute from "./domain/orders/orders.route";

const router = Router();

router.use("/", appRoute);
router.use("/orders", ordersRoute);

export default router;
