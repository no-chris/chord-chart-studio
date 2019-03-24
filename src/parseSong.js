import _ from 'lodash';

import isChordLine from './isChordLine';
import isTimeSignature from './isTimeSignatureString';
import parseTimeSignature from './parseTimeSignature';
import getAllChordsInSong from './getAllChordsInSong';

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

				} catch (e) {
					line.type = 'text';
				}

			} else {
				line.type = 'text';
			}
			return line;
		});


	const allChords = getAllChordsInSong(allLines);

	return {
		allLines,
		allChords
	};
}
