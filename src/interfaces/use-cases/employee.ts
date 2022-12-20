import { IEmployee, Login, SignUp } from "../entities/employee";

export interface IEmployeeRepository {
	create: (body: SignUp) => Promise<IEmployee>,
	getById: (id: number) => Promise<IEmployee | null>,
	getByEmail: (email: string) => Promise<IEmployee | null>
}

export interface IEmployeeService {
	create: (body: SignUp) => Promise<IEmployee>,
	getById: (id: number) => Promise<IEmployee>,
	getByLogin: (login: Login) => Promise<IEmployee>,
	getByEmail: (email: string) => Promise<IEmployee>,
}