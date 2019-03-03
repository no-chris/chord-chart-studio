import { Chords } from 'momo-chords';
const chords = new Chords();

export default {
	render(chordSymbol) {
		return chords.print(chords.parse(chordSymbol).symbol);
	}
};