import {
  Unity,
  IUnity,
  ResponseUnityService,
  ResponseUnityRepository,
} from "../interfaces/entities/unity";
import { IUnityService } from "../interfaces/use-cases/unity";
import { BoardRepository } from "../repositories/board";
import { EmployeeRepository } from "../repositories/employee";
import { SaleRepository } from "../repositories/sales";
import { UnityRepository } from "../repositories/unity";

export class UnityService implements IUnityService {
  private readonly unityRepository: UnityRepository;
  private readonly employeeRepository: EmployeeRepository;
  private readonly boardRepository: BoardRepository;
  private readonly saleRepository: SaleRepository;
  constructor() {
    this.unityRepository = new UnityRepository();
    this.employeeRepository = new EmployeeRepository();
    this.boardRepository = new BoardRepository();
    this.saleRepository = new SaleRepository();
  }

  async create(body: Unity): Promise<IUnity> {
    const { name, managerId, boardId } = body;
    const unity = await this.unityRepository.getByName(name);
    if (unity) throw { code: 409, error: "this unity already exists." };

    const board = await this.boardRepository.getById(boardId);
    if (!board) throw { code: 404, error: "board not found." };

    const employee = await this.employeeRepository.getById(managerId);
    if (!employee) throw { code: 404, error: "employee not found." };

    return await this.unityRepository.create(body);
  }

  async getById(id: number): Promise<IUnity> {
    const unity = await this.unityRepository.getById(id);
    if (!unity) throw { code: 404, error: "unity not found." };

    return unity;
  }

  async getByName(name: string): Promise<IUnity> {
    const unity = await this.unityRepository.getByName(name);
    if (!unity) throw { code: 404, error: "unity not found." };

    return unity;
  }

  async getAll(): Promise<ResponseUnityService[]> {
    const unities = await this.unityRepository.getAll();
    if (!unities) return [];

    return await this.totalEarningHelper(unities);
  }

  async getByPrincipalId(principalId: number): Promise<ResponseUnityService[]> {
    const employee = await this.employeeRepository.getById(principalId);
    if (!employee) throw { code: 404, error: "employee not found." };

    const unities = await this.unityRepository.getByPrincipalId(principalId);
    if (!unities) return [];

    return await this.totalEarningHelper(unities);
  }

  async getByManagerId(managerId: number): Promise<ResponseUnityService[]> {
    const employee = await this.employeeRepository.getById(managerId);
    if (!employee) throw { code: 404, error: "employee not found." };

    const unities = await this.unityRepository.getByManagerId(managerId);
    if (!unities) return [];

    return await this.totalEarningHelper(unities);
  }

  async totalEarningHelper(data: Array<ResponseUnityRepository>): Promise<ResponseUnityService[]> {
    let formatedData = [];
    for (let i of data) {
      const totalEarning = await this.saleRepository.getTotalEarnings(i.id);
      formatedData.push({ ...i, totalEarning });
    }
    return formatedData;
  }
}
