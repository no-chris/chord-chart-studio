export default class IncorrectBeatCountException extends Error {
	constructor(
		{
			message,
			string = '',
			symbol = '',
			duration = 0,
			beatCount = 0,
			beatsPerBar = 0
		} = {}
	) {
		super(message);
		this.name = 'IncorrectBeatCountException';

		if (!symbol) {
			throw new TypeError('COVER ME');
		}
		this.string = string;
		this.symbol = symbol;
		this.duration = duration;
		this.beatCount = beatCount;
		this.beatsPerBar = beatsPerBar;
	}
}

