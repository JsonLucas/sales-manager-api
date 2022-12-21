import { NextFunction, Request, Response } from "express";
import { Token } from "../helpers/token";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw { code: 403, error: "missing access token." };

  const completeAuth = authorization.split(" ");
  if (completeAuth[0] !== "Bearer") throw { code: 401, error: "invalid access token." };

  const tokenAction = new Token();
  const { employeeId, positionId } = tokenAction.verificate(completeAuth[1], "auth");

  res.locals.employeeData = { employeeId, positionId };
  next();
};
