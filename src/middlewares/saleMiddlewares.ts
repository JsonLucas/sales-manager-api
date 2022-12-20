import { Request, Response, NextFunction } from "express";
import { Validator } from "../helpers/validations";
import { createSaleSchema } from "../utils/schemas";

export const createSaleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { body } = req;
	const validator = new Validator();
	await validator.validate(body, createSaleSchema);
	
	next();
}