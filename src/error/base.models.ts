/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

export interface IBaseError {

	/**
	 * The error group
	 */
	readonly group: string;

	/**
	 * The error code
	 */
	readonly code: string;

	/**
	 * The error message (inherited from Error)
	 */
	readonly message: string;

	/**
	 * The http error status or undefined or zero
	 */
	readonly status?: number;
}
