import { Crypt } from "../helpers/crypt";
import { SignUp, IEmployee, Login } from "../interfaces/entities/employee";
import { IEmployeeService } from "../interfaces/use-cases/employee";
import { EmployeeRepository } from "../repositories/employee";

export class EmployeeService implements IEmployeeService {
  private readonly employeeRepository: EmployeeRepository;
  constructor() {}

  async create(body: SignUp): Promise<IEmployee> {
    const { email } = body;
    const employee = await this.employeeRepository.getByEmail(email);
    if (employee) throw { code: 409, error: "this employee already exists." };

    return await this.employeeRepository.create(body);
  }

  async getById(id: number): Promise<IEmployee> {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) throw { code: 404, error: "employee not found." };

    return employee;
  }

  async getByEmail(email: string): Promise<IEmployee> {
    const employee = await this.employeeRepository.getByEmail(email);
    if (!employee) throw { code: 404, error: "employee not found." };

    return employee;
  }

  async getByLogin(login: Login): Promise<IEmployee> {
    const { email, password } = login;
    const employee = await this.employeeRepository.getByEmail(email);
    if (!employee) throw { code: 404, error: "employee not found." };

    const crypt = new Crypt();
    const passwordVerification = await crypt.compare(
      password,
      employee.password
    );
    if (!passwordVerification)
      throw { code: 401, error: "incorrect login or password" };

    return employee;
  }
}
