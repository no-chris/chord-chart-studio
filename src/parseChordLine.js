import _ from 'lodash';

import IncorrectBeatCountException from './exceptions/IncorrectBeatCountException';
import InvalidChordRepetitionException from './exceptions/InvalidChordRepetitionException';
import replaceMultipleSpaces from './core/string/replaceMultipleSpaces';

export default function parseChordLine(
	chordLine,
	{
		beatsPerBar = 4
	} = {}
) {

	const allLineChords = replaceMultipleSpaces(chordLine)
		.trim()
		.split(' ');
	const allBars = [];

	let bar = { allChords: []};
	let chord = {};
	let beatsCount = 0;
	let chordCount = 0;
	let previousChord = {};

	allLineChords.forEach(chordString => {
		chord = {
			string: chordString,
			duration: ((chordString.match(/\./g) || []).length) || beatsPerBar,
			symbol: chordString.replace(/\./g, '')
		};
		beatsCount += chord.duration;


		if (bar.allChords.length > 0) {
			previousChord = bar.allChords[bar.allChords.length - 1];
			if (previousChord.symbol === chord.symbol) {
				throw new InvalidChordRepetitionException({
					string: chord.string,
					symbol: chord.symbol
				});
			}
		}

		bar.allChords.push(chord);
		chordCount++;

		if (beatsCount === beatsPerBar) {
			allBars.push(_.cloneDeep(bar));
			bar = { allChords: []};
			beatsCount = 0;
			previousChord = {};

		} else if (beatsCount > beatsPerBar) {
			throw new IncorrectBeatCountException({
				message: '',
				string: chord.string,
				symbol: chord.symbol,
				duration: chord.duration,
				beatCount: beatsCount,
				beatsPerBar: beatsPerBar,
			});
		}
	});

	if (beatsCount > 0 && (beatsCount < beatsPerBar)) {
		throw new IncorrectBeatCountException({
			message: '',
			string: chord.string,
			symbol: chord.symbol,
			duration: chord.duration,
			beatCount: beatsCount,
			beatsPerBar: beatsPerBar,
		});
	}

	return {
		chordCount,
		allBars
	};
}