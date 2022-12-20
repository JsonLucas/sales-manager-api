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