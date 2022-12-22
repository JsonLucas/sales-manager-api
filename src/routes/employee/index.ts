import { Router } from "express";
import { signInController } from "../../controllers/employeeControllers";
import { signInMiddleware } from "../../middlewares/employeeMiddlewares";

export const userRouter = Router();
userRouter.post('/signin', signInMiddleware, signInController);