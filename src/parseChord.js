import { Chords } from 'momo-chords';

const chords = new Chords();

export default function parseChord(chordString) {
	return chords.parse(chordString);
}