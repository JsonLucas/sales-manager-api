import { IUnity } from "../entities/unity";

export interface IUnityRepository{
	create: () => Promise<IUnity>,
	getById: (id: number) => Promise<IUnity | null>,
	getByName: (name: string) => Promise<IUnity | null>
}

export interface IUnityService{
	create: () => Promise<IUnity>,
	getById: (id: number) => Promise<IUnity>,
	getByName: (name: string) => Promise<IUnity>
}