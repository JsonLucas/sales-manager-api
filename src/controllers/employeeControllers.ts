import { Request, Response } from "express";
import { Token } from "../helpers/token";
import { EmployeeService } from "../services/employee";
import { PositionService } from "../services/position";
import { UnityService } from "../services/unity";

export const signInController = async (req: Request, res: Response) => {
  const { body } = req;
  const positionService = new PositionService();
  const employeeService = new EmployeeService();
  const unityService = new UnityService();

  const { id, positionId } = await employeeService.getByLogin(body);
  const { name } = await positionService.getById(positionId);

  const tokenAction = new Token();
  const refreshToken = tokenAction.generateRefreshToken(id, positionId);
  const accessToken = tokenAction.generateAccessToken(refreshToken);

  switch(name){
	case "Diretor Geral":
		const allUnitiesData = await unityService.getAll();
		return res.status(200).send({ refreshToken, accessToken, unitiesData: allUnitiesData });
	case "Diretor":
		const boardUnitiesData = await unityService.getByPrincipalId(id);
		return res.status(200).send({ refreshToken, accessToken, unitiesData: boardUnitiesData });
	case "Gerente":
		const unityData = await unityService.getByManagerId(id);
		return res.status(200).send({ refreshToken, accessToken, unitiesData: unityData });
	default:
		return res.status(200).send({ refreshToken, accessToken });
  }
};

