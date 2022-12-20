import { Request, Response, NextFunction } from 'express';
import { Token } from '../helpers/token';
import { Validator } from '../helpers/validations';
import { signInSchema, signUpSchema } from '../utils/schemas';

export const signInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { body } = req;
	if(!body) throw { code: 400 };

	const validator = new Validator();
	await validator.validate(body, signInSchema);

	next();
}

export const signUpMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { body } = req;
	if(!body) throw { code: 400 };

	const validator = new Validator();
	await validator.validate(body, signUpSchema);
	
	next();
}