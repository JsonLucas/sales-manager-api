import { Request, Response } from "express";
import { EmployeeService } from "../services/employee";
import { PositionService } from "../services/position";
import { SaleService } from "../services/sales";

export const salesController = async (req: Request, res: Response) => {
  const { employeeData } = res.locals;
  const { employeeId } = employeeData;

  const employeeService = new EmployeeService();
  const positionService = new PositionService();
  const saleService = new SaleService();

  const { positionId } = await employeeService.getById(employeeId);
  const { name } = await positionService.getById(positionId);

  switch (name) {
    case "Diretor Geral":
      const allSales = await saleService.getAll();
      return res.status(200).send(allSales);
    case "Diretor":
      const byPrincipal = await saleService.getByPrincipalId(employeeId);
      return res.status(200).send(byPrincipal);
    case "Gerente":
      const byManager = await saleService.getByManagerId(employeeId);
      return res.status(200).send(byManager);
    case "Vendedor":
      const bySeller = await saleService.getBySellerId(employeeId);
      return res.status(200).send(bySeller);
    default:
      throw { code: 400, error: "invalid employee position." };
  }
};
