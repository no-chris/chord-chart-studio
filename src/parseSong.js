import _ from 'lodash';

import isChordLine from './isChordLine';

export default function parseSong(song, { parseChordLine } = {}) {

	if (!_.isFunction(parseChordLine)) {
		throw new TypeError('parseChordLine should be a function, received : ' + parseChordLine);
	}

	const songLines = (!_.isArray(song)) ? song.split('\n') : song;

	return songLines
		.map(string => ({ string }))
		.map(line => {
			if (isChordLine(line.string)) {
				try {
					line.parsed = parseChordLine(line.string);
					line.type = 'chord';
				} catch (e) {
					line.parsed = line.string;
					line.type = 'text';
				}

			} else {
				line.parsed = line.string;
				line.type = 'text';
			}
			return line;
		});
}