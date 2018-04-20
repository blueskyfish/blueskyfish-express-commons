/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { HttpStatus } from './http.models';

/**
 * The sending JSON has the status `okay`.
 *
 * @type {HttpStatus}
 */
export const HTTP_STATUS_OKAY: HttpStatus   = 'okay';

/**
 * The sending JSON has the status `error`.
 *
 * @type {HttpStatus}
 */
export const HTTP_STATUS_ERROR: HttpStatus  = 'error';

/**
 * The http status "Okay"
 */
export const HTTP_OK: number = 200;

/**
 * The http status code "Bad Request"
 */
export const HTTP_BAD_REQUEST: number = 400;

/**
 * The http status code "Unauthorized"
 */
export const HTTP_UNAUTHORIZED: number = 401;

/**
 * The http status code "Forbidden"
 */
export const HTTP_FORBIDDEN: number = 403;

/**
 * The http status code "Not Found"
 */
export const HTTP_NOT_FOUND: number = 404;
