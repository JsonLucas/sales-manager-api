import { Request, Response, NextFunction } from "express";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { body }=req;
	if(!body) throw { code: 400 };
	res.sendStatus(200);
}