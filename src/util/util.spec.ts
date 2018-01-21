/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import * as assert from 'assert';

import 'mocha';

import { Util, JsonReplacer } from './util';

describe('Class Util', () => {

	it('Should replace the secrets', () => {
		const config = {
			host: 'localhost',
			password: 'test1234',
			secrets: 'whatever',
			port: 3200
		};
		const replacer: JsonReplacer = Util.secretReplacer('password', 'secrets');
		const text: string = Util.toJson(config, replacer, false);
		assert.ok(text === '{"host":"localhost","password":"*****","secrets":"*****","port":3200}');
		// console.log(text);
	});

	it('Should create a sha code', () => {
		const text: string = Util.sha('secret', 'test1234');
		assert.ok(text === 'f34f5906e39b987d95565a35a6bac3f963607c17026d93f22f47c06202848fb6');
	});

	it('Should convert into a number', () => {
		assert.ok(20 === Util.toNumber('20', -1));
		assert.ok(-1 === Util.toNumber('0x12', -1));
	});

	it('Should not convert numbers into number', () => {
		assert.ok(20 === Util.toNumber(20, -1));
	});

	it('Should not convert "null" into number', () => {
		assert.ok(-1 === Util.toNumber(null, -1));
	});

	it('Should not convert "text with number" into number', () => {
		assert.ok(-1 === Util.toNumber('3Test', -1));
	});
});
