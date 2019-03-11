import _ from 'lodash';

import getChordSymbol from './getChordSymbol';

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
	let beatCount = 0;
	let chordCount = 0;
	let previousChord = {};

	allLineChords.forEach(chordString => {
		chord = {
			string: chordString,
			duration: ((chordString.match(/\./g) || []).length) || beatsPerBar,
			symbol: getChordSymbol(chordString.replace(/\./g, '')),
		};
		chord.beat = beatCount + 1;
		beatCount += chord.duration;

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

		if (beatCount === beatsPerBar) {
			bar.beatCount = beatCount;
			allBars.push(_.cloneDeep(bar));

			bar = { allChords: []};
			beatCount = 0;
			previousChord = {};

		} else if (beatCount > beatsPerBar) {
			throw new IncorrectBeatCountException({
				message: '',
				string: chord.string,
				symbol: chord.symbol,
				duration: chord.duration,
				beatCount: beatCount,
				beatsPerBar: beatsPerBar,
			});
		}
	});

	if (beatCount > 0 && (beatCount < beatsPerBar)) {
		throw new IncorrectBeatCountException({
			message: '',
			string: chord.string,
			symbol: chord.symbol,
			duration: chord.duration,
			beatCount: beatCount,
			beatsPerBar: beatsPerBar,
		});
	}

	return {
		chordCount,
		allBars
	};
}