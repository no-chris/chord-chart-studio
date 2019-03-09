import isChordLine from './isChordLine';

export default function parseSong(songTxt, { parseChordLine } = {}) {
	return songTxt
		.split('\n')
		.map(string => ({ string }))
		.map(line => {
			if (isChordLine(line.string)) {
				line.type = 'chord';
				line.parsed = parseChordLine(line.string);

			} else {
				line.type = 'text';
				line.parsed = line.string;
			}
			return line;
		});
}