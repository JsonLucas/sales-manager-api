import { Router } from "express";
import { salesRouter } from "./sales";
import { userRouter } from "./employee";
import { tokenRouter } from "./token";

export const appRouter = Router();
appRouter.use(userRouter);
appRouter.use(salesRouter);
appRouter.use(tokenRouter);