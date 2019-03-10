import getChordSymbol from '../../getChordSymbol';
import chordSymbolTpl from './chordSymbol.hbs';

export default {
	render(chordSymbolOriginal) {
		const chordSymbol = getChordSymbol(chordSymbolOriginal);
		return chordSymbolTpl({ chordSymbol });
	}
};