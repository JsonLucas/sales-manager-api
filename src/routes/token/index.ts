import { Router } from 'express';
import { refreshTokenController } from '../../controllers/refreshTokenController';
import { refreshTokenMiddleware } from '../../middlewares/refreshTokenMiddleware';

export const tokenRouter = Router();
tokenRouter.post('/refresh-token', refreshTokenMiddleware, refreshTokenController);