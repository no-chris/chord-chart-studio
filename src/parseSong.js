import _ from 'lodash';

import isChordLine from './isChordLine';

export default function parseSong(song, { parseChordLine } = {}) {
	const songLines = (!_.isArray(song)) ? song.split('\n') : song;

	return songLines
		.map(string => ({ string }))
		.map(line => {
			if (isChordLine(line.string)) {
				try {
					line.type = 'chord';
					line.parsed = parseChordLine(line.string);
				} catch (e) {
					line.type = 'text';
					line.parsed = line.string;
				}

			} else {
				line.type = 'text';
				line.parsed = line.string;
			}
			return line;
		});
}