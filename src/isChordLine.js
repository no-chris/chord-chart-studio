import replaceMultipleSpaces from './core/string/replaceMultipleSpaces';
import { Chords } from 'momo-chords';

const chords = new Chords();

export default function isChordLine(line) {
	return replaceMultipleSpaces(line, ' ')
		.trim()
		.split(' ')
		.map(potentialChord => potentialChord.replace(/\.*$/g, ''))
		.every(potentialChord => chords.isChord(potentialChord));
}
