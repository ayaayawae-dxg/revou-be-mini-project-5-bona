import { Router } from "express";

import appRoute from "./domain/app/app.route";
import productsRoute from "./domain/products/products.route";

const router = Router();

router.use("/", appRoute);
router.use("/products", productsRoute);

export default router;
