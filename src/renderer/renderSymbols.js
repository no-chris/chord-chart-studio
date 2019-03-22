import _ from 'lodash';
import getChordSymbol from '../getChordSymbol';

export default function renderSymbols(songLines) {
	const rendered = _.cloneDeep(songLines);

	rendered.forEach(line => {
		if (line.type === 'chord') {
			line.model.allBars.forEach(bar => {
				bar.allChords.forEach(chord => {
					chord.symbol = (chord.transposedModel)
						? getChordSymbol(chord.transposedModel)
						: getChordSymbol(chord.model);
				});
			});
		}
	});
	return rendered;
}