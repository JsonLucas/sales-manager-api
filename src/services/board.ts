import { Board, IBoard } from "../interfaces/entities/board";
import { IBoardService } from "../interfaces/use-cases/board";
import { BoardRepository } from "../repositories/board";
import { EmployeeRepository } from "../repositories/employee";
import { BoardNotFound, ConflictBoard, EmployeeNotFound } from "../utils/constraints";

export class BoardService implements IBoardService {
  private readonly employeeRepository: EmployeeRepository;
  private readonly boardRepository: BoardRepository;
  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.boardRepository = new BoardRepository();
  }

  async create(body: Board): Promise<IBoard> {
    const { name, principalId } = body;
    const board = await this.boardRepository.getByName(name);
    if (board) throw ConflictBoard;

    const employee = await this.employeeRepository.getById(principalId);
    if (!employee) throw EmployeeNotFound;

    return await this.boardRepository.create(body);
  }

  async getById(id: number): Promise<IBoard> {
    const board = await this.boardRepository.getById(id);
    if (!board) throw BoardNotFound;

    return board;
  }

  async getByName(name: string): Promise<IBoard> {
    const board = await this.boardRepository.getByName(name);
    if (!board) throw BoardNotFound;

    return board;
  }

  async getByPrincipalId(principalId: number): Promise<IBoard> {
    const employee = await this.employeeRepository.getById(principalId);
    if (!employee) throw EmployeeNotFound;

    const board = await this.boardRepository.getByPrincipalId(principalId);
    if (!board) throw BoardNotFound;

    return board;
  }
}
