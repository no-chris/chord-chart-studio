import _ from 'lodash';

import isChordLine from './isChordLine';
import isTimeSignature from './isTimeSignatureString';
import getTimeSignature from './getTimeSignature';

const defaultTimeSignature = '4/4';

export default function parseSong(song, { parseChordLine } = {}) {

	const allChords = [];

	if (!_.isFunction(parseChordLine)) {
		throw new TypeError('parseChordLine should be a function, received : ' + parseChordLine);
	}

	let timeSignature = getTimeSignature(defaultTimeSignature);

	const songLines = (!_.isArray(song)) ? song.split('\n') : song;

	const allLines = songLines
		.map(string => ({ string }))
		.map(line => {
			if (isTimeSignature(line.string)) {
				timeSignature = getTimeSignature(line.string);
				line.type = 'time-signature';

			} else if (isChordLine(line.string)) {
				try {
					line.type = 'chord';
					line.model = parseChordLine(line.string, { timeSignature });

					line.model.allBars.forEach(bar => {
						bar.allChords.forEach(chord => {
							if (isNewChord(allChords, chord.model)) {
								allChords.push(chord.model);
							}
						});
					});

				} catch (e) {
					line.type = 'text';
				}

			} else {
				line.type = 'text';
			}
			return line;
		});

	return {
		allLines,
		allChords
	};
}


function isNewChord(allChords, newChord) {
	return allChords.every(chord => {
		return !(_.isEqual(chord, newChord));
	});
}