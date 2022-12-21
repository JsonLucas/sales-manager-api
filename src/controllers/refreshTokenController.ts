import { Request, Response } from "express";
import { Token } from "../helpers/token";

export const refreshTokenController = async (req: Request, res: Response) => {
	const { employeeData } = res.locals;
	const { employeeId, positionId } = employeeData;
	
	const tokenAction = new Token();
	const refreshToken = tokenAction.generateRefreshToken(employeeId, positionId);
	const accessToken = tokenAction.generateAccessToken(refreshToken);

	res.status(200).send({ refreshToken, accessToken });
}