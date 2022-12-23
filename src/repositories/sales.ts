import { Sale, ISale, ResponseSale } from "../interfaces/entities/sales";
import { ISaleRepository } from "../interfaces/use-cases/sales";
import { prisma } from "../utils/prisma";

export class SaleRepository implements ISaleRepository {
  async create(body: Sale): Promise<ISale> {
    return await prisma.sales.create({ data: { ...body } });
  }

  async getAll(): Promise<ResponseSale[] | null> {
    return await prisma.sales.findMany({
      select: {
        id: true,
        saleDate: true,
        value: true,
		roamingSale: true,
        coordinates: true,
        employee: { select: { id: true, name: true } },
        unity: {
          select: {
            id: true,
            name: true,
			managerId: true,
            board: { select: { id: true, name: true, principalId: true } },
          },
        },
      },
    });
  }

  async getById(id: number): Promise<ResponseSale | null> {
    return await prisma.sales.findUnique({
      where: { id },
      select: {
        id: true,
        saleDate: true,
        value: true,
		roamingSale: true,
        coordinates: true,
        employee: { select: { id: true, name: true } },
        unity: {
          select: {
            id: true,
            name: true,
			managerId: true,
            board: { select: { id: true, name: true, principalId: true } },
          },
        },
      },
    });
  }

  async getBySellerId(employeeId: number): Promise<ResponseSale[] | null> {
    return await prisma.sales.findMany({
      where: { employeeId },
      select: {
        id: true,
        saleDate: true,
        value: true,
		roamingSale: true,
        coordinates: true,
        employee: { select: { id: true, name: true } },
        unity: {
          select: {
            id: true,
            name: true,
			managerId: true,
            board: { select: { id: true, name: true, principalId: true } },
          },
        },
      },
    });
  }

  async getByUnityId(unityId: number): Promise<ResponseSale[] | null> {
    return await prisma.sales.findMany({
      where: { unityId },
      select: {
        id: true,
        saleDate: true,
        value: true,
		roamingSale: true,
        coordinates: true,
        employee: { select: { id: true, name: true } },
        unity: {
          select: {
            id: true,
            name: true,
			managerId: true,
            board: { select: { id: true, name: true, principalId: true } },
          },
        },
      },
    });
  }

  async getByManagerId(managerId: number): Promise<ResponseSale[] | null> {
    return await prisma.sales.findMany({
      where: { unity: { managerId } },
      select: {
        id: true,
        saleDate: true,
        value: true,
		roamingSale: true,
        coordinates: true,
        employee: { select: { id: true, name: true } },
        unity: {
          select: {
            id: true,
            name: true,
			managerId: true,
            board: { select: { id: true, name: true, principalId: true } },
          },
        },
      },
    });
  }

  async getByPrincipalId(principalId: number): Promise<ResponseSale[] | null> {
    return await prisma.sales.findMany({
      where: { unity: { board: { principalId } } },
      select: {
        id: true,
        saleDate: true,
        value: true,
		roamingSale: true,
        coordinates: true,
        employee: { select: { id: true, name: true } },
        unity: {
          select: {
            id: true,
            name: true,
			managerId: true,
            board: { select: { id: true, name: true, principalId: true } },
          },
        },
      },
    });
  }

  async getTotalEarnings(unityId: number): Promise<number> {
    const { _sum } = await prisma.sales.aggregate({
      _sum: { value: true },
      where: { unityId },
    });
	
	return _sum.value;
  }
}
