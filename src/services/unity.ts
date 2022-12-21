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
import { BoardNotFound, ConflictUnity, EmployeeNotFound, UnityNotFound } from "../utils/constraints";

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
    if (unity) throw ConflictUnity;

    const board = await this.boardRepository.getById(boardId);
    if (!board) throw BoardNotFound;

    const employee = await this.employeeRepository.getById(managerId);
    if (!employee) throw EmployeeNotFound;

    return await this.unityRepository.create(body);
  }

  async getById(id: number): Promise<IUnity> {
    const unity = await this.unityRepository.getById(id);
    if (!unity) throw UnityNotFound;

    return unity;
  }

  async getByName(name: string): Promise<IUnity> {
    const unity = await this.unityRepository.getByName(name);
    if (!unity) throw UnityNotFound;

    return unity;
  }

  async getAll(): Promise<ResponseUnityService[]> {
    const unities = await this.unityRepository.getAll();
    if (!unities) return [];

    return await this.totalEarningHelper(unities);
  }

  async getByPrincipalId(principalId: number): Promise<ResponseUnityService[]> {
    const employee = await this.employeeRepository.getById(principalId);
    if (!employee) throw EmployeeNotFound;

    const unities = await this.unityRepository.getByPrincipalId(principalId);
    if (!unities) return [];

    return await this.totalEarningHelper(unities);
  }

  async getByManagerId(managerId: number): Promise<ResponseUnityService[]> {
    const employee = await this.employeeRepository.getById(managerId);
    if (!employee) throw EmployeeNotFound;

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
