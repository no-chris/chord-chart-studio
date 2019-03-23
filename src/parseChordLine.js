import _ from 'lodash';

import parseChord from './parseChord';
import parseTimeSignature from './parseTimeSignature';

import IncorrectBeatCountException from './exceptions/IncorrectBeatCountException';
import InvalidChordRepetitionException from './exceptions/InvalidChordRepetitionException';

export default function parseChordLine(
	chordLine,
	{
		timeSignature = parseTimeSignature('4/4')
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
	let model = {};
	let currentBeatCount = 0;
	let chordCount = 0;
	let previousChord = {};

	allLineChords.forEach(chordString => {
		model = parseChord(chordString.replace(/\./g, ''));
		chord = {
			string: chordString,
			duration: ((chordString.match(/\./g) || []).length) || beatCount,
			model,
		};
		chord.beat = currentBeatCount + 1;
		currentBeatCount += chord.duration;

		if (bar.allChords.length > 0) {
			previousChord = bar.allChords[bar.allChords.length - 1];
			if (_.isEqual(previousChord.model, chord.model)) {
				throw new InvalidChordRepetitionException({
					string: chord.string,
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