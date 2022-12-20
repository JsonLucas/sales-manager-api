import { Sale, ISale } from "../interfaces/entities/sales";
import { ISaleRepository } from "../interfaces/use-cases/sales";
import { prisma } from "../utils/prisma";

export class SaleRepository implements ISaleRepository {
  async create(body: Sale): Promise<ISale> {
    return await prisma.sales.create({ data: { ...body } });
  }

  async getAll(): Promise<ISale[]> {
    return await prisma.sales.findMany();
  }

  async getById(id: number): Promise<ISale | null> {
    return await prisma.sales.findUnique({ where: { id } });
  }

  async getByEmployeeId(employeeId: number): Promise<ISale[] | null> {
    return await prisma.sales.findMany({ where: { employeeId } });
  }

  async getByUnityId(unityId: number): Promise<ISale[] | null> {
    return await prisma.sales.findMany({ where: { unityId } });
  }

  async getByManagerId(managerId: number): Promise<ISale[] | null> {
    return await prisma.sales.findMany({ where: { unity: { managerId } } });
  }

  async getByPrincipalId(principalId: number): Promise<ISale[] | null> {
    return await prisma.sales.findMany({
      where: { unity: { board: { principalId } } },
    });
  }
}
