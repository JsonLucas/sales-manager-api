import { Router } from "express";
import { salesController } from "../../controllers/saleControllers";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const salesRouter = Router();
salesRouter.get('/sales', authMiddleware, salesController);