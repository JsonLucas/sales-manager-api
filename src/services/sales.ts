import { Sale, ISale } from "../interfaces/entities/sales";
import { ISaleService } from "../interfaces/use-cases/sales";
import { EmployeeRepository } from "../repositories/employee";
import { SaleRepository } from "../repositories/sales";
import { UnityRepository } from "../repositories/unity";

export class SaleService implements ISaleService {
  private readonly employeeRepository: EmployeeRepository;
  private readonly unityRepository: UnityRepository;
  private readonly saleRepository: SaleRepository;
  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.unityRepository = new UnityRepository();
    this.saleRepository = new SaleRepository();
  }

  async create(body: Sale): Promise<ISale> {
    const { employeeId, unityId } = body;
    const employee = await this.employeeRepository.getById(employeeId);
    if (!employee) throw { code: 404, error: "employee not found." };

    const unity = await this.unityRepository.getById(unityId);
    if (!unity) throw { code: 404, error: "unity not found." };

    return await this.saleRepository.create(body);
  }

  async getAll(): Promise<ISale[]> {
    const sales = await this.saleRepository.getAll();
    if (!sales) return [];
    return sales;
  }

  async getById(id: number): Promise<ISale> {
    const sale = await this.saleRepository.getById(id);
    if (!sale) throw { code: 404, error: "sale not found." };

    return sale;
  }

  async getBySellerId(sellerId: number): Promise<ISale[]> {
    const employee = await this.employeeRepository.getById(sellerId);
    if (!employee) throw { code: 404, error: "employee not found." };

    const sellerSales = await this.saleRepository.getBySellerId(sellerId);
    if (!sellerSales) return [];

    return sellerSales;
  }

  async getByUnityId(unityId: number): Promise<ISale[]> {
    const unity = await this.unityRepository.getById(unityId);
    if (!unity) throw { code: 404, error: "unity not found." };

    return await this.saleRepository.getByUnityId(unityId);
  }

  async getByManagerId(managerId: number): Promise<ISale[]> {
    const employee = await this.employeeRepository.getById(managerId);
    if (!employee) throw { code: 404, error: "employee not found." };

    const sales = await this.saleRepository.getByManagerId(managerId);
    if (!sales) return [];

    return sales;
  }

  async getByPrincipalId(principalId: number): Promise<ISale[]> {
    const employee = await this.employeeRepository.getById(principalId);
    if (!employee) throw { code: 404, error: "employee not found." };

    const sales = await this.saleRepository.getByPrincipalId(principalId);
    if (!sales) return [];

    return sales;
  }
}
