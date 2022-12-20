import { Router } from "express";
import { salesRouter } from "./sales";
import { userRouter } from "./employee";

export const appRouter = Router();
appRouter.use(userRouter);
appRouter.use(salesRouter);