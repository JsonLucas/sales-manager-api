import { IUnity, Unity } from "../entities/unity";

export interface IUnityRepository{
	create: (body: Unity) => Promise<IUnity>,
	getById: (id: number) => Promise<IUnity | null>,
	getByName: (name: string) => Promise<IUnity | null>
}

export interface IUnityService{
	create: (body: Unity) => Promise<IUnity>,
	getById: (id: number) => Promise<IUnity>,
	getByName: (name: string) => Promise<IUnity>
}