import { Sale, ISale } from "../interfaces/entities/sales";
import { ISaleService } from "../interfaces/use-cases/sales";
import { EmployeeRepository } from "../repositories/employee";
import { SaleRepository } from "../repositories/sales";
import { UnityRepository } from "../repositories/unity";

export class SaleService implements ISaleService {
  private readonly employeeRepository: EmployeeRepository;
  private readonly unityRepository: UnityRepository;
  private readonly saleRepository: SaleRepository;
  constructor() {}

  async create(body: Sale): Promise<ISale> {
    const { employeeId, unityId } = body;
    const employee = await this.employeeRepository.getById(employeeId);
    if (!employee) throw { code: 404, error: "employee not found." };

	const unity = await this.unityRepository.getById(unityId);
	if(!unity) throw { code: 404, error: 'unity not found.' };

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

  async getByEmployeeId(employeeId: number): Promise<ISale[]> {
    const employee = await this.employeeRepository.getById(employeeId);
    if (!employee) throw { code: 404, error: "employee not found." };

    const employeeSales = await this.saleRepository.getByEmployeeId(employeeId);
    if (!employeeSales) return [];

    return employeeSales;
  }

  async getByUnityId(unityId: number): Promise<ISale[]> {
    const unity = await this.unityRepository.getById(unityId);
    if (!unity) throw { code: 404, error: "unity not found." };

    return await this.saleRepository.getByUnityId(unityId);
  }

  async getByManagerId(managerId: number): Promise<ISale[]>{
	const employee = await this.employeeRepository.getById(managerId);
	if(!employee) throw { code: 404, error: 'employee not found.' };

	const sales = await this.saleRepository.getByManagerId(managerId);
	if(!sales) return [];
	
	return sales;
  }

  async getByPrincipalId(principalId: number): Promise<ISale[]>{
	const employee = await this.employeeRepository.getById(principalId);
	if(!employee) throw { code: 404, error: 'employee not found.' };

	const sales = await this.saleRepository.getByPrincipalId(principalId);
	if(!sales) return [];
	
	return sales;
  }
}
