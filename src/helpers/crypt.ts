import bcrypt from 'bcrypt';

interface ICrypt {
	compare: (pass: string, hash: string) => Promise<boolean>;
	encode: (pass: string) => Promise<string>;
}

export class Crypt implements ICrypt {
	async compare(pass: string, hash: string): Promise<boolean>{
		const compare = await bcrypt.compare(pass, hash);
		return compare;
	}

	async encode(pass: string): Promise<string>{
		const hashed = await bcrypt.hash(pass, 10);
		return hashed;
	}
}