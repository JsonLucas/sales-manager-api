import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from '../utils/env';

interface IToken {
	verificate: (auth: string, type: string) => string;
	generateAccessToken: (refreshToken: string) => string;
	generateRefreshToken: (userId: number) => string;
}

export class Token implements IToken {
	constructor() {
		if (!jwtSecret) throw { code: 500, error: "missing or invalid jwt key." };
	}
	
	verificate(auth: string, type: string): string {
		try {
			const verification = jsonwebtoken.verify(auth, jwtSecret, { ignoreExpiration: false }) as any;
			if(type === 'access'){
				const access = jsonwebtoken.decode(verification.refreshToken) as string;
				return access;
			}
			return verification.userId;
		} catch (e: any) {
			console.log(e);
			if(type === 'refresh'){
				return this.generateAccessToken(auth);
			}
			throw { code: 400, error: e };
		}
	}
	generateAccessToken(refreshToken: string): string{
		const accessToken = jsonwebtoken.sign({ refreshToken }, jwtSecret, { expiresIn: '1d' });
		return accessToken;
	}
	generateRefreshToken(userId: number): string{
		const refreshToken = jsonwebtoken.sign({ userId }, jwtSecret, { expiresIn: '30d' });
		return refreshToken;
	}
}