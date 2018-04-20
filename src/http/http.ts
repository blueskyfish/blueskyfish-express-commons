/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { Request, Response } from 'express';

import { IBaseError } from '../error/base.models';
import {
	HTTP_BAD_REQUEST,
	HTTP_OK,
	HTTP_STATUS_ERROR,
	HTTP_STATUS_OKAY
} from './http.defines';

export class Http {

	/**
	 * Send the data to the client. The sending has the mime type `application/json` and the status code `200`.
	 *
	 * @param {Response} res the express response
	 * @param {*} data the data
	 */
	static sendData(res: Response, data: any): void {
		res.send({
			status: HTTP_STATUS_OKAY,
			data: data
		}).end();
	}

	/**
	 * Render a view with the given data entity. The result is sending to the client as `text/html`
	 * with the status code `200`.
	 *
	 * @param {e.Response} res the express response
	 * @param {string} template the filename to the template
	 * @param {object} data the value for the template.
	 */
	static renderView(res: Response, template: string, data: any): void {
		res.render(template, data);
	}

	/**
	 * Send a media data directly. e.g SVG, PNG, PDF
	 *
	 * @param {Response} res the express response
	 * @param {string} mimeType the mime type of the data
	 * @param {string | Buffer} data the data
	 */
	static sendMedia(res: Response, mimeType: string, data: string|Buffer): void {
		res.setHeader('content-type', mimeType);
		res.status(HTTP_OK).send(data).end();
	}

	/**
	 * Send an error message to the client. If the error status is greater zero then it use the status, otherwise
	 * it sends Bad Request.
	 *
	 * @param {Response} res the express response
	 * @param {IBaseError} error the error message
	 */
	static sendError(res: Response, error: IBaseError): void {
		const status: number = error.status && error.status > 0 ? error.status : HTTP_BAD_REQUEST;
		const data = {
			status: HTTP_STATUS_ERROR,
			data: {
				group: error.group ? error.group : error.code,
				code: error.code,
				message: error.message
			}
		};
		res.status(status).send(data).end();
	}

	/**
	 * Find the value from the given header name.
	 *
	 * @param {e.Request} req the request
	 * @param {string} headName the header name.
	 * @returns {string} If the header is founded, then it returns the value, otherwise it returns null.
	 */
	static fromHeader(req: Request, headName: string): string {
		const tempName = headName.toLocaleLowerCase();
		const foundedName = Object.keys(req.headers)
			.find((name: string) => {
				return name.toLocaleLowerCase() === tempName;
			});
		return foundedName ? req.headers[foundedName] as string : null;
	}

	/**
	 * Returns the path parameter value or the default value.
	 * @param {Request} req the express request
	 * @param {string|number} param
	 * @param {string} defValue
	 * @returns {string}
	 */
	static fromPathParam(req: Request, param: string|number, defValue: string = null): string {
		return req.params[param] as string || defValue;
	}

	/**
	 * Returns the query parameter value of the default value.
	 * @param {Request} req the express request
	 * @param {string} param
	 * @param {string} defValue
	 * @returns {string}
	 */
	static fromQueryParam(req: Request, param: string, defValue: string = null): string {
		return req.query[param] as string || defValue;
	}

	/**
	 * Returns the payload object.
	 * @param {Request} req
	 * @returns {T}
	 */
	static getBody<T>(req: Request): T {
		return req.body as T;
	}
}
