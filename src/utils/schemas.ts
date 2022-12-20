import joi from 'joi';

export const signInSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required()
});

export const signUpSchema = joi.object({});

export const createSaleSchema = joi.object({
	value: joi.number().min(0.01).required(),
	coordinates:  joi.string().required(),
	saleDate: joi.date().required(),
	unityName: joi.string().required()
});