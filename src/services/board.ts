import { Board, IBoard } from "../interfaces/entities/board";
import { IBoardService } from "../interfaces/use-cases/board";
import { BoardRepository } from "../repositories/board";
import { EmployeeRepository } from "../repositories/employee";

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
    if (board) throw { code: 409, error: "this board already exists." };

    const employee = await this.employeeRepository.getById(principalId);
    if (!employee) throw { code: 404, error: "user not found." };

    return await this.boardRepository.create(body);
  }

  async getById(id: number): Promise<IBoard> {
    const board = await this.boardRepository.getById(id);
    if (!board) throw { code: 404, error: "board not found." };

    return board;
  }

  async getByName(name: string): Promise<IBoard> {
    const board = await this.boardRepository.getByName(name);
    if (!board) throw { code: 404, error: "board not found." };

    return board;
  }

  async getByPrincipalId(principalId: number): Promise<IBoard> {
    const employee = await this.employeeRepository.getById(principalId);
    if (!employee) throw { code: 404, error: "user not found." };

    const board = await this.boardRepository.getByPrincipalId(principalId);
    if (!board) throw { code: 404, error: "board not found." };

    return board;
  }
}
