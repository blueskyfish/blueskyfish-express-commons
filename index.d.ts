/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { Request, Response } from 'express';

declare namespace e {

	class BaseError extends Error {
		constructor(group: string, code: string, message: string, status?: number);
		readonly group: string;
		readonly code: string;
		readonly status: number;
	}

	enum LogLevel {
		Trace  = 0,
		Debug  = 1,
		Config = 2,
		Info   = 3,
		Warn   = 4,
		Error  = 5
	}

	const LOG_TIME_FORMAT: string;

	class Log {
		static readonly logLevel: LogLevel;
		static init(logLevel: LogLevel): void;
		static isLevel(logLevel: LogLevel): boolean
		static trace(tag: string, message: string, ...args: any[]): void;
		static debug(tag: string, message: string, ...args: any[]): void;
		static config(tag: string, message: string, ...args: any[]): void;
		static info(tag: string, message: string, ...args: any[]): void;
		static warn(tag: string, message: string, ...args: any[]): void;
		static error(tag: string, message: string, ...args: any[]): void;
	}

	class Env {
		static fromEnv(name: string): string;
		static fromEnvNumber(name: string): number;
		static addShutdown(cb: Function): void;
		static exit(code?: number): void;
	}

	type JsonReplacer = (key: string, value: any) => any;

	class Util {
		static readonly NL: string;
		static readonly ENCODING: string;
		static secretReplacer(...keys: string[]): JsonReplacer;
		static toJson(data: any, replacer: JsonReplacer, pretty?: boolean): string;
		static toNumber(value: string, def: number): number;
		static sha(secrets: string, password: string): string;
	}

	const HTTP_OK: number;
	const HTTP_BAD_REQUEST: number;
	const HTTP_UNAUTHORIZED: number;
	const HTTP_FORBIDDEN: number;
	const HTTP_NOT_FOUND: number;

	enum HttpStatus {
		Okay = 'okay',
		Error = 'error'
	}

	class Http {
		static sendData(res: Response, data: any): void;
		static sendError(res: Response, error: BaseError): void;
		static fromHeader(req: Request, headName: string): string;
		static fromPathParam(req: Request, param: string, defValue?: string): string;
		static fromQueryParam(req: Request, param: string, defValue?: string): string;
		static getBody<T>(req: Request): T;
	}
}

export = e;
