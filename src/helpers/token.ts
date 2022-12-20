import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from '../utils/env';

interface IToken {
	verificate: (auth: string, type: string) => any,
	generateRefreshToken: (employeeId: number, positionId: number) => string,
	generateAccessToken: (refreshToken: string) => string
}

export class Token implements IToken {
	constructor() {
		if (!jwtSecret) throw { code: 500, error: "missing or invalid jwt key." };
	}
	
	verificate(auth: string, type: string): any {
		try {
			const verification = jsonwebtoken.verify(auth, jwtSecret, { ignoreExpiration: false }) as any;
			if(type === 'access'){
				const access = jsonwebtoken.decode(verification.refreshToken);
				return access;
			}
			return verification;
		} catch (e: any) {
			console.log(e);
			if(type === 'refresh'){
				return this.generateAccessToken(auth);
			}
			throw { code: 400, error: e.message };
		}
	}
	generateAccessToken(refreshToken: string): string{
		const accessToken = jsonwebtoken.sign({ refreshToken }, jwtSecret, { expiresIn: '1d' });
		return accessToken;
	}
	generateRefreshToken(employeeId: number, positionId: number): string{
		const refreshToken = jsonwebtoken.sign({ employeeId, positionId }, jwtSecret, { expiresIn: '30d' });
		return refreshToken;
	}
}