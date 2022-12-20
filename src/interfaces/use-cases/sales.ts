import { ISale, ResponseSale, Sale } from "../entities/sales";

export interface ISaleRepository{
	create: (body: Sale) => Promise<ISale>,
	getById: (id: number) => Promise<ResponseSale | null>,
	getByUnityId: (unityId: number) => Promise<Array<ResponseSale> | null>,
	getBySellerId: (employeeId: number) => Promise<Array<ResponseSale> | null>,
	getByManagerId: (managerId: number) => Promise<Array<ResponseSale> | null>,
	getByPrincipalId: (principalId: number) => Promise<Array<ResponseSale> | null>,
	getAll: () => Promise<Array<ResponseSale> | null>,
	getTotalEarnings: (unityId: number) => Promise<number>
}

export interface ISaleService{
	create: (body: Sale) => Promise<ISale>,
	getById: (id: number) => Promise<ResponseSale>,
	getByUnityId: (unityId: number) => Promise<Array<ResponseSale>>,
	getBySellerId: (sellerId: number) => Promise<Array<ResponseSale>>,
	getByManagerId: (managerId: number) => Promise<Array<ResponseSale>>,
	getByPrincipalId: (principalId: number) => Promise<Array<ResponseSale>>,
	getAll: () => Promise<Array<ResponseSale>>
}