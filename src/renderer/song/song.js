import parseSong from '../../parseSong';
import parseChordLine from '../../parseChordLine';

import getMaxBeatsWidth from '../../getMaxBeatsWidth';

import simpleChordSpacer from '../../spacer/chord/simple';
import alignedChordSpacer from '../../spacer/chord/aligned';
import barContentRenderer from '../bar/barContent';
import chordLineRenderer from '../chord/chordLine';
import chordSymbolRenderer from '../chord/chordSymbol';
import textLineRenderer from '../text/textLine';

import songTpl from './song.hbs';


export default {
	render(songTxt, {
		alignBars = false
	}) {
		let allLines = parseSong(songTxt, { parseChordLine });

		const maxBeatsWidth = getMaxBeatsWidth(allLines);

		const song = allLines
			.map(line => {

				if (line.type === 'chord') {
					const spaced = (alignBars)
						? alignedChordSpacer(line.model, maxBeatsWidth)
						: simpleChordSpacer(line.model);

					line.rendered = chordLineRenderer.render(spaced, {
						barContentRenderer: barContentRenderer,
						chordRenderer: chordSymbolRenderer,
					});

				} else if (line.type === 'text') {
					line.rendered = textLineRenderer.render(line.string);
				}
				return line;
			})
			.map(line => line.rendered)
			.join('\n');

		return songTpl({ song });
	}
};
