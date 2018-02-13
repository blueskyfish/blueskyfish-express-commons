/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

export interface IBaseError {
	readonly group: string;
	readonly code: string;
	readonly message: string;
	readonly status: number;
}
