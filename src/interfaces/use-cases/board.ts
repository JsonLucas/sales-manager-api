import { Board, IBoard } from "../entities/board";

export interface IBoardRepository{
	create: (body: Board) => Promise<IBoard>,
	getById: (id: number) => Promise<IBoard | null>,
	getByName: (name: string) => Promise<IBoard | null>,
	getByPrincipalId: (principalId: number) => Promise<IBoard | null>
}

export interface IBoardService{
	create: (body: Board) => Promise<IBoard>,
	getById: (id: number) => Promise<IBoard>,
	getByName: (name: string) => Promise<IBoard>,
	getByPrincipalId: (principalId: number) => Promise<IBoard>
}