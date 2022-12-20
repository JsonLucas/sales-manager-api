export interface ISale{
	id: number,
	coordinates: string,
	value: number,
	saleDate: Date,
	createdAt?: Date,
	updatedAt?: Date,
	unityId: number,
	employeeId: number
}

export interface ISeedSales{
	employeeId: number
	unityName: string,
}

export type Sale = Omit<ISale, 'id' | 'createdAt' | 'updatedAt'>