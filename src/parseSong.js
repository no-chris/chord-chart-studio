import _ from 'lodash';

import isChordLine from './isChordLine';
import isTimeSignature from './isTimeSignatureString';
import getTimeSignature from './getTimeSignature';

const defaultTimeSignature = '4/4';

export default function parseSong(song, { parseChordLine } = {}) {

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
					line.model = parseChordLine(line.string, { timeSignature });
					line.type = 'chord';
				} catch (e) {
					line.type = 'text';
				}

			} else {
				line.type = 'text';
			}
			return line;
		});

	return {
		allLines
	};
}