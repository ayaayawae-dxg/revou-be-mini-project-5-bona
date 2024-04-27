import { Router } from "express";

import productsController from "./products.controller";
import auth from "../../middleware/auth";

const router = Router();

// router.post("/", auth, productsController.create);
router.post("/", productsController.create);

export default router;
