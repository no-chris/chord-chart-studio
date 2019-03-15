import _ from 'lodash';

export default class IncorrectBeatCountException extends Error {
	constructor(
		{
			string,
			symbol,
			duration,
			currentBeatCount,
			beatCount
		} = {}
	) {
		if (!string || !_.isString(string)) {
			throw new TypeError('IncorrectBeatCountException cannot be created without chord string, received: ' + string);
		}
		if (!symbol || !_.isString(symbol)) {
			throw new TypeError('IncorrectBeatCountException cannot be created without chord symbol, received: ' + symbol);
		}
		if (!duration || !_.isFinite(duration)) {
			throw new TypeError('IncorrectBeatCountException cannot be created without chord duration, received: ' + duration);
		}
		if (!currentBeatCount || !_.isFinite(currentBeatCount)) {
			throw new TypeError('IncorrectBeatCountException cannot be created without currentBeatCount, received: ' + currentBeatCount);
		}
		if (!beatCount || !_.isFinite(beatCount)) {
			throw new TypeError('IncorrectBeatCountException cannot be created without beatCount, received: ' + beatCount);
		}

		super();

		this.name = 'IncorrectBeatCountException';
		this.string = string;
		this.symbol = symbol;
		this.duration = duration;
		this.currentBeatCount = currentBeatCount;
		this.beatCount = beatCount;
	}
}

