import replaceMultipleSpaces from './core/string/replaceMultipleSpaces';
import isChord from './isChord';

export default function isChordLine(line = '') {
	return replaceMultipleSpaces(line, ' ')
		.trim()
		.split(' ')
		.map(potentialChord => potentialChord.replace(/\.*$/g, ''))
		.every(potentialChord => isChord(potentialChord));
}
