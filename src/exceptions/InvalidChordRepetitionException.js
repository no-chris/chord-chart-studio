import _ from 'lodash';

export default class InvalidChordRepetitionException extends Error {
	constructor(
		{
			string,
			symbol
		} = {}
	) {
		if (!string || !_.isString(string)) {
			throw new TypeError('InvalidChordRepetitionException cannot be created without chord string, received: ' + string);
		}
		if (!symbol || !_.isString(symbol)) {
			throw new TypeError('InvalidChordRepetitionException cannot be created without chord symbol, received: ' + symbol);
		}

		super();

		this.name = 'InvalidChordRepetitionException';
		this.string = string;
		this.symbol = symbol;
	}
}

