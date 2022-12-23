import { Request, Response } from "express";
import { EmployeeService } from "../services/employee";
import { PositionService } from "../services/position";
import { SaleService } from "../services/sales";
import { InvalidPosition, Unauthorized } from "../utils/constraints";

export const getSalesController = async (req: Request, res: Response) => {
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
      throw InvalidPosition;
  }
};

export const getSaleByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { employeeData } = res.locals;
  const { employeeId, positionId } = employeeData;

  const saleService = new SaleService();
  const positionService = new PositionService();

  const { name } = await positionService.getById(positionId);
  const sale = await saleService.getById(Number(id));
  if (
    (sale.employee.id !== employeeId && name === "Vendedor") ||
    (sale.unity.managerId !== employeeId && name === "Gerente") ||
    (sale.unity.board.principalId !== employeeId && name === "Diretor")
  )
    throw Unauthorized;

  res.status(200).send(sale);
};

export const createSaleController = async (req: Request, res: Response) => {
  const { body } = req;
  const { employeeData } = res.locals;
  const { employeeId, positionId } = employeeData;

  const positionService = new PositionService();
  const { name } = await positionService.getById(Number(positionId));
  if (name !== "Vendedor") throw Unauthorized;

  const saleService = new SaleService();
  await saleService.create({ ...body, employeeId });

  res.sendStatus(201);
};
