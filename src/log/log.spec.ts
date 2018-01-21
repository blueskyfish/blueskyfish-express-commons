/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import * as assert from 'assert';

import 'mocha';

import { Log } from './log.class';
import { LogLevel } from './log.models';

describe('Class Log', () => {

	it('Should show all log levels', () => {
		Log.init(LogLevel.Trace);
		assert.ok(Log.logLevel === LogLevel.Trace);
		assert.ok(Log.isLevel(LogLevel.Trace));
		assert.ok(Log.isLevel(LogLevel.Debug));
		assert.ok(Log.isLevel(LogLevel.Config));
		assert.ok(Log.isLevel(LogLevel.Info));
		assert.ok(Log.isLevel(LogLevel.Warn));
		assert.ok(Log.isLevel(LogLevel.Error));
	});

	it('Should show all log levels from "Debug" and above', () => {
		Log.init(LogLevel.Debug);
		assert.ok(Log.logLevel === LogLevel.Debug);
		assert.ok(!Log.isLevel(LogLevel.Trace));
		assert.ok(Log.isLevel(LogLevel.Debug));
		assert.ok(Log.isLevel(LogLevel.Config));
		assert.ok(Log.isLevel(LogLevel.Info));
		assert.ok(Log.isLevel(LogLevel.Warn));
		assert.ok(Log.isLevel(LogLevel.Error));
	});

	it('Should show all log levels from "Config" and above', () => {
		Log.init(LogLevel.Config);
		assert.ok(Log.logLevel === LogLevel.Config);
		assert.ok(!Log.isLevel(LogLevel.Trace));
		assert.ok(!Log.isLevel(LogLevel.Debug));
		assert.ok(Log.isLevel(LogLevel.Config));
		assert.ok(Log.isLevel(LogLevel.Info));
		assert.ok(Log.isLevel(LogLevel.Warn));
		assert.ok(Log.isLevel(LogLevel.Error));
	});

	it('Should show all log levels from "Info" and above', () => {
		Log.init(LogLevel.Info);
		assert.ok(Log.logLevel === LogLevel.Info);
		assert.ok(!Log.isLevel(LogLevel.Trace));
		assert.ok(!Log.isLevel(LogLevel.Debug));
		assert.ok(!Log.isLevel(LogLevel.Config));
		assert.ok(Log.isLevel(LogLevel.Info));
		assert.ok(Log.isLevel(LogLevel.Warn));
		assert.ok(Log.isLevel(LogLevel.Error));
	});

	it('Should show all log levels from "Warn" and above', () => {
		Log.init(LogLevel.Warn);
		assert.ok(Log.logLevel === LogLevel.Warn);
		assert.ok(!Log.isLevel(LogLevel.Trace));
		assert.ok(!Log.isLevel(LogLevel.Debug));
		assert.ok(!Log.isLevel(LogLevel.Config));
		assert.ok(!Log.isLevel(LogLevel.Info));
		assert.ok(Log.isLevel(LogLevel.Warn));
		assert.ok(Log.isLevel(LogLevel.Error));
	});

	it('Should show only "Error"', () => {
		Log.init(LogLevel.Error);
		assert.ok(Log.logLevel === LogLevel.Error);
		assert.ok(!Log.isLevel(LogLevel.Trace));
		assert.ok(!Log.isLevel(LogLevel.Debug));
		assert.ok(!Log.isLevel(LogLevel.Config));
		assert.ok(!Log.isLevel(LogLevel.Info));
		assert.ok(!Log.isLevel(LogLevel.Warn));
		assert.ok(Log.isLevel(LogLevel.Error));
	});

	it('Should print all log Messages', () => {
		const TEST_TAG = 'test';
		let index: number = 0;
		Log.init(LogLevel.Trace);
		Log.trace(TEST_TAG, 'This is a trace message (%s)', ++index);
		Log.debug(TEST_TAG, 'This is a debug message (%s)', ++index);
		Log.config(TEST_TAG, 'This is a config message (%s)', ++index);
		Log.info(TEST_TAG, 'This is a info message (%s)', ++index);
		Log.warn(TEST_TAG, 'This is a warn message (%s)', ++index);
		Log.error(TEST_TAG, 'This is a error message (%s)', ++index);
	});
});
