import { Request, Response, NextFunction } from "express";
import { Token } from "../helpers/token";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { body } = req;
	if(!body) throw { code: 400 };

	const { refreshToken, accessToken } = body;
	const tokenAction = new Token();
	
	tokenAction.verificate(refreshToken, 'refresh');
	const { employeeId, positionId } = tokenAction.verificate(accessToken, 'access');
	
	res.locals.employeeData = { employeeId, positionId };
	next();
}