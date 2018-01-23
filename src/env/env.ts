/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

export class Env {

	static fromEnv(name: string): string {
		const loName = name.toLowerCase();
		const upName = name.toUpperCase();
		return process.env[name] ||
			process.env[upName] ||
			process.env[loName] ||
			null;
	}

	static fromEnvNumber(name: string): number {
		const value = Env.fromEnv(name);
		const temp = value ? parseInt(value, 10) : NaN;
		return isNaN(temp) ? null : temp;
	}

	static addShutdown(cb: Function): void {
		process.on('SIGTERM', () => cb());
		process.on('SIGINT', () => cb());
	}

	static exit(code?: number): void {
		process.exit(code);
	}
}
