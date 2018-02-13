/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { Request, Response } from 'express';

declare namespace e {

	interface IBaseError {
		readonly group: string;
		readonly code: string;
		readonly message: string;
		readonly status: number;
	}

	class BaseError extends Error implements IBaseError {
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

	function compareLevel(level1: LogLevel, level2: LogLevel): number;

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

	type ShutdownFunc = (signal: string) => void;

	class Env {
		static fromEnv(name: string): string;
		static fromEnvNumber(name: string): number;
		static addShutdown(shutdownFunc: ShutdownFunc): void;
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

		/**
		 * Send a media data directly. e.g SVG, PNG, PDF
		 */
		static sendMedia(res: Response, mimeType: string, data: string|Buffer): void
		static sendError(res: Response, error: IBaseError): void;
		static fromHeader(req: Request, headName: string): string;
		static fromPathParam(req: Request, param: string|number, defValue?: string): string;
		static fromQueryParam(req: Request, param: string, defValue?: string): string;
		static getBody<T>(req: Request): T;
	}

	const FILE_TAG: string;

	class Files {
		static readFile(filename: string, encoding?: string): Promise<string|Buffer>;
		static readJson<T>(filename): Promise<T>;
		static writeFile(filename: string, data: string | Buffer, encoding?: string): Promise<void>
		static writeJson(filename: string, value: any, prettyPrint?: boolean): Promise<void>;
		static exists(filename: string): Promise<boolean>;
		static deleteFile(filename): Promise<void>;
	}
}

export = e;
