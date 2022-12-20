import { Request, Response } from "express";
import { Token } from "../helpers/token";
import { EmployeeService } from "../services/employee";
import { UnityService } from "../services/unity";

export const signInController = async (req: Request, res: Response) => {
  const { body } = req;
  const employeeService = new EmployeeService();
  const unityService = new UnityService();

  const { id, positionId } = await employeeService.getByLogin(body);

  const tokenAction = new Token();
  const refreshToken = tokenAction.generateRefreshToken(id, positionId);
  const accessToken = tokenAction.generateAccessToken(refreshToken);

  const allUnitiesData = await unityService.getAll();
  return res.status(200).send({ refreshToken, accessToken, unitiesData: allUnitiesData });
};

export const signUpController = async (req: Request, res: Response) => {};
