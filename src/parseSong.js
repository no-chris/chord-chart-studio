import _ from 'lodash';

import isChordLine from './isChordLine';
import isTimeSignature from './isTimeSignatureString';
import parseTimeSignature from './parseTimeSignature';

/**
 * @typedef {Object} SongLine
 * @type {Object}
 * @property {String} string - original line in source file
 * @property {String} type - chord|text|time-signature|...
 * @property {ChordLine} model
 */

/**
 * @typedef {Object} Song
 * @type {Object}
 * @property {SongLine[]} allLines
 * @property {SongChord[]} allChords
 */

/**
 * @typedef {Object} SongChord
 * @type {Object}
 * @property {ChordDef} model
 * @property {number} occurrences - number of times the chord appears in the song
 */

const defaultTimeSignature = '4/4';

/**
 * @param {string|array} song
 * @param {Function} parseChordLine
 * @returns {Song}
 */
export default function parseSong(song, { parseChordLine } = {}) {

	const allChords = [];

	if (!_.isFunction(parseChordLine)) {
		throw new TypeError('parseChordLine should be a function, received : ' + parseChordLine);
	}

	let timeSignature = parseTimeSignature(defaultTimeSignature);

	const songLines = (!_.isArray(song)) ? song.split('\n') : song;

	const allLines = songLines
		.map(string => ({ string }))
		.map(line => {
			if (isTimeSignature(line.string)) {
				timeSignature = parseTimeSignature(line.string);
				line.type = 'time-signature';

			} else if (isChordLine(line.string)) {
				try {
					line.type = 'chord';
					line.model = parseChordLine(line.string, { timeSignature });

					saveChordsFromLine(allChords, line);

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


function saveChordsFromLine(allChords, chordLine) {
	let i;

	chordLine.model.allBars.forEach(bar => {
		bar.allChords.forEach(chord => {
			i = _.findIndex(allChords, o => _.isEqual(o.model, chord.model));

			if (i === -1) {
				allChords.push({
					model: _.cloneDeep(chord.model),
					occurrences: 1
				});
			} else {
				allChords[i].occurrences++;
			}
		});
	});
}
