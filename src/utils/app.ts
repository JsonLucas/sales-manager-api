import express, { json, Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandler } from '../middlewares/errorHandler';
import { appRouter } from '../routes';

export class App{
	public application: Application;

	constructor() {
		this.application = express();
		this.middleware();
		this.routes();
		this.application.use(errorHandler);
	}

	middleware(){
		this.application.use(json());
		this.application.use(cors());
	}
	routes(){
		this.application.use(appRouter);
	}
}
