export interface IEmployee{
	id: number,
	name: string,
	email: string,
	password: string,
	positionId: number,
	createdAt?: Date,
	updatedAt?: Date
};

export interface ISeedEmployee{
	name: string,
	email: string,
	positionName: string
}

export type Login = Pick<IEmployee, 'email' | 'password'>;
export type SignUp = Pick<IEmployee, 'name' | 'email' | 'password' | 'positionId'>;