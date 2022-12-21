import jsonwebtoken from 'jsonwebtoken';
import { ExpiredRefreshToken, InvalidKey } from '../utils/constraints';
import { jwtSecret } from '../utils/env';

interface IToken {
	verificate: (auth: string, type: 'access' | 'refresh' | 'auth') => any,
	generateRefreshToken: (employeeId: number, positionId: number) => string,
	generateAccessToken: (refreshToken: string) => string
}

export class Token implements IToken {
	constructor() {
		if (!jwtSecret) throw InvalidKey;
	}
	
	verificate(auth: string, type: string): any {
		try {
			const verification = jsonwebtoken.verify(auth, jwtSecret, { ignoreExpiration: false }) as any;
			if(type === 'auth'){
				const access = jsonwebtoken.decode(verification.refreshToken);
				return access;
			}
			return verification;
		} catch (e: any) {
			console.log(e);
			if(type === 'access'){
				return this.generateAccessToken(auth);
			}
			throw ExpiredRefreshToken;
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