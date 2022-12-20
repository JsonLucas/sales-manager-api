import { Router } from "express";
import { createSaleController, getSaleByIdController, getSalesController } from "../../controllers/saleControllers";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { createSaleMiddleware } from "../../middlewares/saleMiddlewares";

export const salesRouter = Router();
salesRouter.get('/sales', authMiddleware, getSalesController);
salesRouter.get('/sales/:id', authMiddleware, getSaleByIdController);
salesRouter.post('/sales', authMiddleware, createSaleMiddleware, createSaleController);