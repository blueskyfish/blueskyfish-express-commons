/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-commons.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { LogLevel } from './log.models';

export function compareLevel(level1: LogLevel, level2: LogLevel): number {
	return toNum(level1) - toNum(level2);
}

function toNum(level: LogLevel): number {
	switch (level) {
		case LogLevel.Trace:
			return 0;
		case LogLevel.Debug:
			return 1;
		case LogLevel.Config:
			return 2;
		case LogLevel.Info:
			return 3;
		case LogLevel.Warn:
			return 4;
		case LogLevel.Error:
			return 5;
		default:
			return -1;
	}
}
