import parseSong from '../../parseSong';
import parseChordLine from '../../parseChordLine';

import simpleChordSpacer from '../../spacer/chord/simple';
import alignedChordSpacer from '../../spacer/chord/aligned';
import barContentRenderer from '../bar/barContent';
import chordLineRenderer from '../chord/chordLine';
import chordSymbolRenderer from '../chord/chordSymbol';
import textLineRenderer from '../text/textLine';

import songTpl from './song.hbs';

import InvalidChordRepetitionException from '../../exceptions/InvalidChordRepetitionException';
import IncorrectBeatCountException from '../../exceptions/IncorrectBeatCountException';



export default {
	render(songTxt) {
		let allLines = parseSong(songTxt, { parseChordLine });

		//allLines = alignedChordSpacer(allLines);

		allLines = allLines.map(line => {
			if (line.type === 'chord') {
				try {
					//const spaced = simpleChordSpacer(line.parsed);
					const spaced = alignedChordSpacer(line.parsed);

					line.rendered = chordLineRenderer.render(spaced, {
						barContentRenderer: barContentRenderer,
						chordRenderer: chordSymbolRenderer
					});

				} catch (e) {
					if (e instanceof InvalidChordRepetitionException) {
						console.log('A chord cannot follow himself in the same bar: ' + e.string);

					} else if (e instanceof IncorrectBeatCountException) {
						if (e.beatCount > e.beatsPerBar) {
							console.log(`Duration of chord ${e.string} is too long for current bar`);

						} else {
							console.log(`Bar has insufficient beat count: increase ${e.string} duration or add another chord`);
						}
					} else {
						throw e;
					}
					line.rendered = textLineRenderer.render(line.string);
				}



			} else {
				line.rendered = textLineRenderer.render(line.string);
			}
			return line;
		});

		const song = allLines
			.map(line => line.rendered)
			.join('\n');

		return songTpl({ song });
	},

	toString() {
		return this.render();
	}
};
