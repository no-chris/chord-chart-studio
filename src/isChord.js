import { Chords } from 'momo-chords';

const chords = new Chords();

export default function isChord(potentialChord) {
	return chords.isChord(potentialChord);
}