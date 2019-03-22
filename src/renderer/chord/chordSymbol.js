import getChordSymbol from '../../getChordSymbol';
import chordSymbolTpl from './chordSymbol.hbs';

export default {
	/**
	 * @param {ChordDef} chordDef
	 */
	render(chordDef) {
		const chordSymbol = getChordSymbol(chordDef);
		return chordSymbolTpl({ chordSymbol });
	}
};