/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

export class BaseError extends Error {

	constructor(private _group: string, private _code: string, message: string, private _status: number = 0) {
		super(message);
	}

	get group(): string {
		return this._group;
	}

	get code(): string {
		return this._code;
	}

	get status(): number {
		return this._status;
	}
}
