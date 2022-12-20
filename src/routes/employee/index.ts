import { Router } from "express";
import { signInController, signUpController } from "../../controllers/employeeControllers";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { signInMiddleware, signUpMiddleware } from "../../middlewares/employeeMiddlewares";

export const userRouter = Router();
userRouter.post('/signin', signInMiddleware, signInController);
// userRouter.post('/signup', signUpMiddleware, signUpController);