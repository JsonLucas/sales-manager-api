import 'dotenv/config';
import { v4 as uuid } from 'uuid';

export const port = process.env.PORT || 5000;
export const jwtSecret = process.env.JWT_SECRET || uuid();