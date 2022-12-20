import { ISale, Sale } from "../entities/sales";

export interface ISaleRepository{
	create: (body: Sale) => Promise<ISale>,
	getById: (id: number) => Promise<ISale | null>,
	getByUnityId: (unityId: number) => Promise<Array<ISale> | null>,
	getByEmployeeId: (employeeId: number) => Promise<Array<ISale> | null>,
	getByManagerId: (managerId: number) => Promise<Array<ISale> | null>,
	getByPrincipalId: (principalId: number) => Promise<Array<ISale> | null>,
	getAll: () => Promise<Array<ISale> | null>,
}

export interface ISaleService{
	create: (body: Sale) => Promise<ISale>,
	getById: (id: number) => Promise<ISale>,
	getByUnityId: (unityId: number) => Promise<Array<ISale>>,
	getByEmployeeId: (employeeId: number) => Promise<Array<ISale>>,
	getByManagerId: (managerId: number) => Promise<Array<ISale>>,
	getByPrincipalId: (principalId: number) => Promise<Array<ISale>>,
	getAll: () => Promise<Array<ISale>>,
}