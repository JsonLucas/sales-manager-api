export interface IBoard {
	id: number
	name: string
	principalId: number
	createdAt?: Date
	updatedAt?: Date
}

export interface ISeedBoard {
	name: string,
	principalId: number,
}

export type Board = Pick<IBoard, 'name' | 'principalId'>;