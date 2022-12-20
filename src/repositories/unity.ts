import { IUnity, Unity } from "../interfaces/entities/unity";
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
}
