import { IPosition } from "../interfaces/entities/position";
import { IPositionService } from "../interfaces/use-cases/position";
import { PositionRepository } from "../repositories/position";
import { ConflictPosition, PositionNotFound } from "../utils/constraints";

export class PositionService implements IPositionService {
  private readonly positionRepository: PositionRepository;
  constructor() {
    this.positionRepository = new PositionRepository();
  }

  async create(name: string): Promise<IPosition> {
    const position = await this.positionRepository.getByName(name);
    if (position) throw ConflictPosition;

    return await this.positionRepository.create(name);
  }

  async getById(id: number): Promise<IPosition> {
    const position = await this.positionRepository.getById(id);
    if (!position) throw PositionNotFound;

    return position;
  }

  async getByName(name: string): Promise<IPosition> {
    const position = await this.positionRepository.getByName(name);
    if (!position) throw PositionNotFound;

    return position;
  }
}
