import { Router } from "express";

import productsController from "./products.controller";
import auth from "../../middleware/auth";

const router = Router();

// router.post("/", auth, productsController.create);
router.post("/", productsController.create);
router.get("/check-availability", productsController.checkAvailability);

export default router;
