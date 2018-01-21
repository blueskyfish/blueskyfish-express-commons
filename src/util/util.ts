/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import * as crypto from 'crypto';

const NL = '\n';

const ENCODING = 'utf8';

const ALGORITHM = 'sha256';
const OUTPUT = 'hex';

/**
 * The function of json replace
 */
export type JsonReplacer = (key: string, value: any) => any;

export class Util {

	static readonly NL: string = NL;

	static readonly ENCODING: string = ENCODING;

	/**
	 * The function replace the give keys with the star sign
	 *
	 * @param {string} keys the list of properties replacing with the `*`.
	 * @returns {JsonReplacer} the function
	 */
	static secretReplacer(...keys: string[]): JsonReplacer {

		return function (key: string, value: any): any {
			if (key && keys.indexOf(key) >= 0) {
				return '*****';
			}
			return value;
		}
	}

	/**
	 * Simple stringifiy an object to JSON.
	 *
	 * @param {*} data
	 * @param {JsonReplacer} replacer
	 * @param {boolean} pretty
	 * @return {string}
	 */
	static toJson(data: any, replacer: JsonReplacer = null, pretty: boolean = true): string {
		return JSON.stringify(data, replacer || null, pretty ? 2 : null);
	}

	/**
	 * Convert a string into a number
	 * @param {string|*} value
	 * @param {number} def
	 * @return {number}
	 */
	static toNumber(value: string|any, def: number): number {
		if (typeof value === 'number') {
			return value;
		}
		if (!value) {
			return def;
		}
		const no: number = parseInt(value, 10);
		if (isNaN(no) || !no || '' + no !== value) {
			return def;
		}
		return no;
	}

	static sha(secrets: string, password: string): string {
		const text: string = `${secrets}:${password}`;
		return crypto.createHash(ALGORITHM).update(text).digest(OUTPUT);
	}

}

