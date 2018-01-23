/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import * as assert from 'assert';

import 'mocha';
import { Env } from './env';

describe('Env', () => {

	it('Should returns null when name is null', () => {
		assert.ok(Env.fromEnv(null) === null);
	});
	it('Should returns null when name is undefined', () => {
		let name;
		assert.ok(Env.fromEnv(name) === null);
	});

	describe('With variables', () => {

		before(() => {
			process.env['test'] = '1';
		});

		it('Should read the value from "test"', () => {
			assert.ok('1' === Env.fromEnv('Test'));
		});

		it('Should read the number from "test"', () => {
			assert.ok(1 === Env.fromEnvNumber('tEST'));
		});
	});
});
