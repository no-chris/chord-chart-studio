import _ from 'lodash';

export default class IncorrectBeatCountException extends Error {
	constructor(
		{
			string,
			symbol,
			duration,
			beatCount,
			beatsPerBar
		} = {}
	) {
		if (!string || !_.isString(string)) {
			throw new TypeError('InvalidChordRepetitionException cannot be created without chord string, received: ' + string);
		}
		if (!symbol || !_.isString(symbol)) {
			throw new TypeError('InvalidChordRepetitionException cannot be created without chord symbol, received: ' + symbol);
		}
		if (!duration || !_.isFinite(duration)) {
			throw new TypeError('InvalidChordRepetitionException cannot be created without chord duration, received: ' + duration);
		}
		if (!beatCount || !_.isFinite(beatCount)) {
			throw new TypeError('InvalidChordRepetitionException cannot be created without beatCount, received: ' + beatCount);
		}
		if (!beatsPerBar || !_.isFinite(beatsPerBar)) {
			throw new TypeError('InvalidChordRepetitionException cannot be created without beatsPerBar, received: ' + beatsPerBar);
		}

		super();

		this.name = 'IncorrectBeatCountException';
		this.string = string;
		this.symbol = symbol;
		this.duration = duration;
		this.beatCount = beatCount;
		this.beatsPerBar = beatsPerBar;
	}
}

