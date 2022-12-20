import { IUnity, ResponseUnityRepository, Unity } from "../interfaces/entities/unity";
import { IUnityRepository } from "../interfaces/use-cases/unity";
import { prisma } from "../utils/prisma";

export class UnityRepository implements IUnityRepository {
  async create(body: Unity): Promise<IUnity> {
    return await prisma.unities.create({ data: { ...body } });
  }

  async getById(id: number): Promise<IUnity> {
    return await prisma.unities.findUnique({ where: { id } });
  }

  async getByName(name: string): Promise<IUnity> {
    return await prisma.unities.findUnique({ where: { name } });
  }

  async getAll(): Promise<ResponseUnityRepository[] | null> {
    return await prisma.unities.findMany({
      select: {
        id: true,
        name: true,
        coordinates: true,
        employee: { select: { name: true } },
        board: { select: { name: true } },
      },
    });
  }

  async getByPrincipalId(principalId: number): Promise<ResponseUnityRepository[] | null> {
    return await prisma.unities.findMany({
      where: { board: { principalId } },
      select: {
        id: true,
        name: true,
        coordinates: true,
        employee: { select: { name: true } },
        board: { select: { name: true } },
      },
    });
  }

  async getByManagerId(managerId: number): Promise<ResponseUnityRepository[] | null> {
    return await prisma.unities.findMany({
      where: { managerId },
      select: {
        id: true,
        name: true,
        coordinates: true,
        employee: { select: { name: true } },
        board: { select: { name: true } },
      },
    });
  }
}
