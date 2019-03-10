import { Chords } from 'momo-chords';

const chords = new Chords();

export default function(chordString) {
	return chords.print(chords.parse(chordString).symbol);
}