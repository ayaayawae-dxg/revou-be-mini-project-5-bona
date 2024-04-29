import { Router } from "express";

import appRoute from "./domain/app/app.route";

const router = Router();

router.use("/", appRoute);

export default router;
