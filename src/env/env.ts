/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

export type ShutdownFunc = (signal: string) => void;

export class Env {

	/**
	 * Returns the value of the environment. There is no distinction between upper and lower case
	 *
	 * @param {string} name the environment name
	 * @return {string|null} the value or null
	 */
	static fromEnv(name: string): string {
		if (!name) {
			return null;
		}
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

	/**
	 * Add the shutdown function for listening the signals `SIGTERM` or `SIGINT` or `SIGKILL`.
	 *
	 * @param {ShutdownFunc} shutdownFunc
	 */
	static addShutdown(shutdownFunc: ShutdownFunc): void {
		process.on('SIGTERM', () => shutdownFunc('SIGTERM'));
		process.on('SIGINT', () => shutdownFunc('SIGINT'));
	}

	static exit(code?: number): void {
		process.exit(code);
	}
}
