import _ from 'lodash';

import parseChord from './parseChord';
import getChordSymbol from './getChordSymbol';
import getTimeSignature from './getTimeSignature';

import IncorrectBeatCountException from './exceptions/IncorrectBeatCountException';
import InvalidChordRepetitionException from './exceptions/InvalidChordRepetitionException';

export default function parseChordLine(
	chordLine,
	{
		timeSignature = getTimeSignature('4/4')
	} = {}
) {
	const { beatCount } = timeSignature;

	const allLineChords = chordLine
		.replace(/  +/g, ' ')
		.trim()
		.split(' ');
	const allBars = [];

	let bar = { allChords: []};
	let chord = {};
	let currentBeatCount = 0;
	let chordCount = 0;
	let previousChord = {};

	allLineChords.forEach(chordString => {
		chord = {
			string: chordString,
			duration: ((chordString.match(/\./g) || []).length) || beatCount,
			symbol: getChordSymbol(chordString.replace(/\./g, '')),
			model: parseChord(chordString.replace(/\./g, '')),
		};
		chord.beat = currentBeatCount + 1;
		currentBeatCount += chord.duration;

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

		if (currentBeatCount === beatCount) {
			bar.timeSignature = timeSignature;

			allBars.push(_.cloneDeep(bar));

			bar = { allChords: []};
			currentBeatCount = 0;
			previousChord = {};

		} else if (currentBeatCount > beatCount) {
			throw new IncorrectBeatCountException({
				message: '',
				string: chord.string,
				symbol: chord.symbol,
				duration: chord.duration,
				currentBeatCount,
				beatCount,
			});
		}
	});

	if (currentBeatCount > 0 && (currentBeatCount < beatCount)) {
		throw new IncorrectBeatCountException({
			message: '',
			string: chord.string,
			symbol: chord.symbol,
			duration: chord.duration,
			currentBeatCount,
			beatCount,
		});
	}

	return {
		chordCount,
		allBars
	};
}