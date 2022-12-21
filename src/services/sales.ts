import { ISale, ResponseSale, SetSale } from "../interfaces/entities/sales";
import { ISaleService } from "../interfaces/use-cases/sales";
import { EmployeeRepository } from "../repositories/employee";
import { SaleRepository } from "../repositories/sales";
import { UnityRepository } from "../repositories/unity";
import { EmployeeNotFound, SaleNotFound, UnityNotFound } from "../utils/constraints";

export class SaleService implements ISaleService {
  private readonly employeeRepository: EmployeeRepository;
  private readonly unityRepository: UnityRepository;
  private readonly saleRepository: SaleRepository;
  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.unityRepository = new UnityRepository();
    this.saleRepository = new SaleRepository();
  }

  async create(body: SetSale): Promise<ISale> {
    const { employeeId, unityName, saleDate, value, coordinates } = body;
    const employee = await this.employeeRepository.getById(employeeId);
    if (!employee) throw EmployeeNotFound;

    const unity = await this.unityRepository.getByName(unityName);
    if (!unity) throw UnityNotFound;

	let roamingSale = false;
	if(unity.coordinates !== coordinates) roamingSale = true;

    return await this.saleRepository.create({ saleDate, value, employeeId, roamingSale, coordinates, unityId: unity.id });
  }

  async getAll(): Promise<ResponseSale[]> {
    const sales = await this.saleRepository.getAll();
    if (!sales) return [];
    return sales;
  }

  async getById(id: number): Promise<ResponseSale> {
    const sale = await this.saleRepository.getById(id);
    if (!sale) throw SaleNotFound;

    return sale;
  }

  async getBySellerId(sellerId: number): Promise<ResponseSale[]> {
    const employee = await this.employeeRepository.getById(sellerId);
    if (!employee) throw EmployeeNotFound;

    const sellerSales = await this.saleRepository.getBySellerId(sellerId);
    if (!sellerSales) return [];

    return sellerSales;
  }

  async getByUnityId(unityId: number): Promise<ResponseSale[]> {
    const unity = await this.unityRepository.getById(unityId);
    if (!unity) throw UnityNotFound;

    return await this.saleRepository.getByUnityId(unityId);
  }

  async getByManagerId(managerId: number): Promise<ResponseSale[]> {
    const employee = await this.employeeRepository.getById(managerId);
    if (!employee) throw EmployeeNotFound;

    const sales = await this.saleRepository.getByManagerId(managerId);
    if (!sales) return [];

    return sales;
  }

  async getByPrincipalId(principalId: number): Promise<ResponseSale[]> {
    const employee = await this.employeeRepository.getById(principalId);
    if (!employee) throw EmployeeNotFound;

    const sales = await this.saleRepository.getByPrincipalId(principalId);
    if (!sales) return [];

    return sales;
  }
}
