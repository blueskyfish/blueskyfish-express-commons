/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { Request, Response } from 'express';

declare namespace e {

	/**
	 * The current version of the library
	 */
	const version: string;

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

		/**
		 * The function replace the give keys with the star sign
		 *
		 * @param {string} keys the list of properties replacing with the `*`.
		 * @returns {JsonReplacer} the function
		 */
		static secretReplacer(...keys: string[]): JsonReplacer;

		/**
		 * Simple stringifiy an object to JSON.
		 *
		 * @param {*} data
		 * @param {JsonReplacer} replacer
		 * @param {boolean} pretty
		 * @return {string}
		 */
		static toJson(data: any, replacer: JsonReplacer, pretty?: boolean): string;

		/**
		 * Convert a string into a number. If the parameter is already a number, then it returns this number.
		 *
		 * @param {*} value the value
		 * @param {number} def the default value if the parameter is not convertable.
		 * @return {number} the number value.
		 */
		static toNumber(value: any, def: number): number;

		/**
		 * Generates an sha256 hash from the given secrets (salt) and a password.
		 *
		 * @param {string} secrets the secrets or salt
		 * @param {string} password the password
		 * @return {string} the hash from the sha256 function
		 */
		static sha(secrets: string, password: string): string;

		/**
		 * Replace all bracket kinds and hash signs with the given sign
		 * @param {string} s
		 * @param {string} [sign] replace with this signe (default `-`)
		 * @return {string}
		 */
		static adjustAndLower(s: string, sign?: string): string;
	}

	/**
	 * Defines the status value at sending JSON elements.
	 */
	type HttpStatus = 'okay' | 'error';

	const HTTP_OK: number;
	const HTTP_NOT_MODIFIED: number;
	const HTTP_BAD_REQUEST: number;
	const HTTP_UNAUTHORIZED: number;
	const HTTP_FORBIDDEN: number;
	const HTTP_NOT_FOUND: number;

	/**
	 * The sending JSON has the status `okay`.
	 *
	 * @type {HttpStatus}
	 */
	const HTTP_STATUS_OKAY: HttpStatus;

	/**
	 * The sending JSON has the status `error`.
	 *
	 * @type {HttpStatus}
	 */
	const HTTP_STATUS_ERROR: HttpStatus;

	class Http {

		/**
		 * Send the data to the client. The sending has the mime type `application/json` and the status code `200`.
		 *
		 * @param {Response} res the express response
		 * @param {*} data the data
		 */
		static sendData(res: Response, data: any): void;

		/**
		 * Render a view with the given data entity. The result is sending to the client as `text/html`
		 * with the status code `200`.
		 *
		 * @param {e.Response} res the express response
		 * @param {string} template the filename to the template
		 * @param {object} data the value for the template.
		 */
		static renderView(res: Response, template: string, data: any): void;

		/**
		 * Send a media data directly. e.g SVG, PNG, PDF
		 *
		 * @param {Response} res the express response
		 * @param {string} mimeType the mime type of the data
		 * @param {string | Buffer} data the data
		 */
		static sendMedia(res: Response, mimeType: string, data: string | Buffer): void

		/**
		 * Send an error message to the client. If the error status is greater zero then it use the status, otherwise
		 * it sends Bad Request.
		 *
		 * @param {Response} res the express response
		 * @param {IBaseError} error the error message
		 */
		static sendError(res: Response, error: IBaseError): void;

		/**
		 * Find the value from the given header name.
		 *
		 * @param {e.Request} req the request
		 * @param {string} headName the header name.
		 * @returns {string} If the header is founded, then it returns the value, otherwise it returns null.
		 */
		static fromHeader(req: Request, headName: string): string;

		/**
		 * Returns the path parameter value or the default value.
		 * @param {Request} req the express request
		 * @param {string|number} param
		 * @param {string} defValue
		 * @returns {string}
		 */
		static fromPathParam(req: Request, param: string | number, defValue?: string): string;

		/**
		 * Returns the query parameter value of the default value.
		 * @param {Request} req the express request
		 * @param {string} param
		 * @param {string} defValue
		 * @returns {string}
		 */
		static fromQueryParam(req: Request, param: string, defValue?: string): string;

		/**
		 * Returns the payload object.
		 * @param {Request} req
		 * @returns {T}
		 */
		static getBody<T>(req: Request): T;

		/**
		 * Returns the value of the request header.
		 *
		 * @param {Request} req the request
		 * @param {string} name the name of the header (e.g. Content-Type)
		 * @return {string} the value or null if the value is not exist.
		 */
		static getHeader(req: Request, name: string): string;

		/**
		 * Set the response header with the given header and value
		 *
		 * @param {Response} res the response
		 * @param {string} name the name of the header
		 * @param {string} value the value of the header
		 */
		static setHeader(res: Response, name: string, value: string): void;
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
