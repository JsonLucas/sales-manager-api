import { Crypt } from "../helpers/crypt";
import { SignUp, IEmployee, Login } from "../interfaces/entities/employee";
import { IEmployeeService } from "../interfaces/use-cases/employee";
import { EmployeeRepository } from "../repositories/employee";
import { ConflictEmployee, EmployeeNotFound, IncorrectCredentials } from "../utils/constraints";

export class EmployeeService implements IEmployeeService {
  private readonly employeeRepository: EmployeeRepository;
  constructor() {
	this.employeeRepository = new EmployeeRepository();
  }

  async create(body: SignUp): Promise<IEmployee> {
    const { email } = body;
    const employee = await this.employeeRepository.getByEmail(email);
    if (employee) throw ConflictEmployee;

    return await this.employeeRepository.create(body);
  }

  async getById(id: number): Promise<IEmployee> {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) throw EmployeeNotFound;

    return employee;
  }

  async getByEmail(email: string): Promise<IEmployee> {
    const employee = await this.employeeRepository.getByEmail(email);
    if (!employee) throw EmployeeNotFound;

    return employee;
  }

  async getByLogin(login: Login): Promise<IEmployee> {
    const { email, password } = login;
    const employee = await this.employeeRepository.getByEmail(email);
    if (!employee) throw EmployeeNotFound;

    const crypt = new Crypt();
    const passwordVerification = await crypt.compare(password, employee.password);
    if (!passwordVerification) throw IncorrectCredentials;

    return employee;
  }
}
