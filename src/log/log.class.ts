/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import * as util from 'util';

import * as moment from 'moment';
import { compareLevel } from './log.compare';

import { LOG_TIME_FORMAT } from './log.defines';
import { LogLevel } from './log.models';

/**
 * Log write the message to the console.
 */
export class Log {

	private static _logLevel: LogLevel = LogLevel.Trace;

	static get logLevel(): LogLevel {
		return Log._logLevel;
	}

	static init(logLevel: LogLevel): void {
		Log._logLevel = logLevel;
	}

	static isLevel(logLevel: LogLevel): boolean {
		return compareLevel(logLevel, Log._logLevel) >= 0;
	}

	static trace(tag: string, message: string, ...args: any[]): void {
		Log.print(LogLevel.Trace, tag, message, args);
	}

	static debug(tag: string, message: string, ...args: any[]): void {
		Log.print(LogLevel.Debug, tag, message, args);
	}

	static config(tag: string, message: string, ...args: any[]): void {
		Log.print(LogLevel.Config, tag, message, args);
	}

	static info(tag: string, message: string, ...args: any[]): void {
		Log.print(LogLevel.Info, tag, message, args);
	}

	static warn(tag: string, message: string, ...args: any[]): void {
		Log.print(LogLevel.Warn, tag, message, args);
	}

	static error(tag: string, message: string, ...args: any[]): void {
		Log.print(LogLevel.Error, tag, message, args);
	}

	private static print(logLevel: LogLevel, tag: string, message: string, args: any[]): void {
		if (!Log.isLevel(logLevel)) {
			return;
		}
		const text = Log.format(message, args);
		const line = [
			moment().format(LOG_TIME_FORMAT),
			' [', LogLevel[logLevel], '] ',
			tag, ': ', text
		].join('');
		switch (logLevel) {
			case LogLevel.Warn:
				console.warn(line);
				break;
			case LogLevel.Info:
				console.info(line);
				break;
			default:
				console.log(line);
				break;
		}
	}

	private static format(message: string, args: any[]): string {
		if (!args || args.length === 0) {
			return message;
		}
		const params = [message].concat(args);
		return util.format.apply(util, params);
	}
}
