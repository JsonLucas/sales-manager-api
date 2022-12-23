import { Request, Response, NextFunction } from "express";

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err);
	res.status(err.code).send(err.error);
}