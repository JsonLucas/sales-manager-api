import { IUnity, ResponseUnityRepository, ResponseUnityService, Unity } from "../entities/unity";

export interface IUnityRepository{
	create: (body: Unity) => Promise<IUnity>,
	getById: (id: number) => Promise<IUnity | null>,
	getByName: (name: string) => Promise<IUnity | null>,
	getAll: () => Promise<Array<ResponseUnityRepository> | null>;
	getByPrincipalId: (principalId: number) => Promise<Array<ResponseUnityRepository> | null>;
	getByManagerId: (managerId: number) => Promise<Array<ResponseUnityRepository> | null>;
}

export interface IUnityService{
	create: (body: Unity) => Promise<IUnity>,
	getById: (id: number) => Promise<IUnity>,
	getByName: (name: string) => Promise<IUnity>,
	getAll: () => Promise<Array<ResponseUnityService>>;
	getByPrincipalId: (principalId: number) => Promise<Array<ResponseUnityService>>;
	getByManagerId: (managerId: number) => Promise<Array<ResponseUnityService>>;
	totalEarningHelper: (data: Array<ResponseUnityRepository>) => Promise<Array<ResponseUnityService>>
}