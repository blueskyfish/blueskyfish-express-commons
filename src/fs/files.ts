/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import * as fs from 'fs';
import { promisify } from 'util';
import { Log, Util } from '../';
import { FILE_TAG } from './files.defines';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export class Files {

	static readFile(filename: string, encoding: string = Util.ENCODING): Promise<string|Buffer> {
		return readFileAsync(filename, { encoding })
	}

	static readJson<T>(filename): Promise<T> {
		return Files.readFile(filename, Util.ENCODING)
			.then((data: string | Buffer) => {
				if (Buffer.isBuffer(data)) {
					data = data.toString(Util.ENCODING);
				}
				try {
					return JSON.parse(data) as T;
				} catch (e) {
					Log.warn(FILE_TAG, 'JSON parse is failed (%s) from %s', e.message, filename);
					return null;
				}
			}, (reason) => {
				Log.warn(FILE_TAG, 'read file is failed: %s', filename);
				return null;
			});
	}

	static writeFile(filename: string, data: string | Buffer, encoding: string = Util.ENCODING): Promise<void> {
		return writeFileAsync(filename, data, { encoding });
	}

	static writeJson(filename: string, value: any, prettyPrint: boolean = true): Promise<void> {
		const data: string = JSON.stringify(value, null, prettyPrint ? 2 : null);
		return Files.writeFile(filename, data, Util.ENCODING);
	}

	static exists(filename: string): Promise<boolean> {
		return new Promise<boolean>(((resolve, reject) => {
			fs.access(filename, (err) => {
				if (err) {
					if (err.code === 'ENOENT') {
						return resolve(false);
					}
					Log.warn(FILE_TAG, 'Exist with error: %s', filename, err);
					return reject(err);
				}
				resolve(true);
			});
		}))
	}

	static deleteFile(filename): Promise<void> {
		return new Promise<void>(((resolve, reject) => {
			fs.unlink(filename, (err) => {
				if (err) {
					Log.warn(FILE_TAG, 'delete file is failed (%s) from %s', err.message, filename);
					return reject(err);
				}
				resolve();
			});
		}));
	}
}
