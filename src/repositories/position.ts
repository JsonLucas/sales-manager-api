import { IPosition } from "../interfaces/entities/position";
import { IPositionRepository } from "../interfaces/use-cases/position";
import { prisma } from "../utils/prisma";

export class PositionRepository implements IPositionRepository {
  async create(name: string): Promise<IPosition> {
    return await prisma.positions.create({ data: { name } });
  }

  async getById(id: number): Promise<IPosition> {
    return await prisma.positions.findUnique({ where: { id } });
  }

  async getByName(name: string): Promise<IPosition> {
    return await prisma.positions.findUnique({ where: { name } });
  }
}
