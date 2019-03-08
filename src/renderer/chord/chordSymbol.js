import { Chords } from 'momo-chords';
import chordSymbolTpl from './chordSymbol.hbs';

const chords = new Chords();

export default {
	render(chordSymbolOriginal) {
		const chordSymbol = chords.print(chords.parse(chordSymbolOriginal).symbol);
		return chordSymbolTpl({ chordSymbol });
	}
};