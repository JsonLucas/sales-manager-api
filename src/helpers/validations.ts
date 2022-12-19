import Joi from "joi";
import { IGenericObject } from "../interfaces/entities/generic-object";

interface IValidator<S, O>{
	validate: (payload: IGenericObject, schema: S, options?: O) => Promise<void>
}

export class Validator implements IValidator<Joi.ObjectSchema, Joi.AsyncValidationOptions>{
	async validate(payload: IGenericObject, schema: Joi.ObjectSchema, options?: Joi.AsyncValidationOptions): Promise<void>{
		try{
			await schema.validateAsync(payload, options);
		}catch(e: any){
			console.log(e);
			throw { code: 422, error: e };
		}
	}
}