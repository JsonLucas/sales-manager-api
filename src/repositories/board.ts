import { Board, IBoard } from "../interfaces/entities/board";
import { IBoardRepository } from "../interfaces/use-cases/board";
import { prisma } from "../utils/prisma";

export class BoardRepository implements IBoardRepository {
  async create(body: Board): Promise<IBoard> {
    return await prisma.boards.create({ data: { ...body } });
  }

  async getById(id: number): Promise<IBoard | null> {
    return await prisma.boards.findUnique({ where: { id } });
  }

  async getByName(name: string): Promise<IBoard> {
    return await prisma.boards.findUnique({ where: { name } });
  }

  async getByPrincipalId(principalId: number): Promise<IBoard> {
    return await prisma.boards.findFirst({ where: { principalId } });
  }
}
