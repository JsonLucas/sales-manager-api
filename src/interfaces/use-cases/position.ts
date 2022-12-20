import { IPosition } from "../entities/position";

export interface IPositionRepository{
	create: (name: string) => Promise<IPosition>,
	getById: (id: number) => Promise<IPosition | null>,
	getByName: (name: string) => Promise<IPosition | null>
}

export interface IPositionService{
	create: (name: string) => Promise<IPosition>,
	getById: (id: number) => Promise<IPosition>,
	getByName: (name: string) => Promise<IPosition>
}