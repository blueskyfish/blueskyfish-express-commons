/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import * as crypto from 'crypto';
import replace = require('lodash/fp/replace');

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
	 * Convert a string into a number. If the parameter is already a number, then it returns this number.
	 *
	 * @param {*} value the value
	 * @param {number} def the default value if the parameter is not convertable.
	 * @return {number} the number value.
	 */
	static toNumber(value: any, def: number): number {
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

	/**
	 * Generates an sha256 hash from the given secrets (salt) and a password.
	 *
	 * @param {string} secrets the secrets or salt
	 * @param {string} password the password
	 * @return {string} the hash from the sha256 function
	 */
	static sha(secrets: string, password: string): string {
		const text: string = `${secrets}:${password}`;
		return crypto.createHash(ALGORITHM).update(text).digest(OUTPUT);
	}

	/**
	 * Replace all bracket kinds and hash signs with the given sign
	 * @param {string} s
	 * @param {string} [sign] replace with this signe (default `-`)
	 * @return {string}
	 */
	static adjustAndLower(s: string, sign: string = '-'): string {
		if (!s) {
			return '';
		}
		return s.toLowerCase()
			.replace(/[ \t\r\n_(){}#\[\]<>!?&%$]/g, '-')
			.replace(/--/g, '-')
			.replace(/-\./g, '.')
			.replace(/-/g, sign);
	}

}

