import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from './swaggerDocOptions';

export const swaggerEndpoint = {
	name: '/docs', 
	server: swaggerUI.serve,
	setup: swaggerUI.setup(swaggerOptions)
}