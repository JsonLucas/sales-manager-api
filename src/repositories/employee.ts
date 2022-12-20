import { SignUp, IEmployee } from "../interfaces/entities/employee";
import { IEmployeeRepository } from "../interfaces/use-cases/employee";
import { prisma } from "../utils/prisma";

export class EmployeeRepository implements IEmployeeRepository {
  async create(body: SignUp): Promise<IEmployee> {
    return await prisma.employees.create({ data: { ...body } });
  }

  async getById(id: number): Promise<IEmployee | null> {
    return await prisma.employees.findUnique({ where: { id } });
  }

  async getByEmail(email: string): Promise<IEmployee | null> {
    return await prisma.employees.findUnique({ where: { email } });
  }
}
