import { IBoard } from "./board";
import { IEmployee } from "./employee";

export interface IUnity{
	id: number,
	name: string,
	coordinates: string,
	boardId: number,
	managerId: number,
	createdAt?: Date
	updatedAt?: Date
}

export interface ISeedUnity{
	name: string, 
	coordinates: string,
	managerId: number,
	boardName: string
}

export type Unity = Omit<IUnity, 'id' | 'createdAt' | 'updatedAt'>;
export type ResponseUnityRepository = Pick<IUnity, 'id' | 'name' | 'coordinates'> 
& { employee: Pick<IEmployee, 'name'> } 
& { board: Pick<IBoard, 'name'> }
export type ResponseUnityService = ResponseUnityRepository & { totalEarning: number };