import { Chords } from 'momo-chords';
import replaceMultipleSpaces from '../../core/string/replaceMultipleSpaces';
import parseChordLine from '../../parseChordLine';

import simpleChordInterspacer from '../../interspacer/chord/simple';
import barContentRenderer from '../bar/barContent';
import chordLineRenderer from '../chord/chordLine';
import chordSymbolRenderer from '../chord/chordSymbol';
import textLineRenderer from '../text/textLine';

import songTpl from './song.hbs';

import stripTags from '../../core/dom/stripTags';

import InvalidChordRepetitionException from '../../exceptions/InvalidChordRepetitionException';
import IncorrectBeatCountException from '../../exceptions/IncorrectBeatCountException';

const chords = new Chords();

function isChordLine(line) {
	return replaceMultipleSpaces(line, ' ')
		.trim()
		.split(' ')
		.every(potentialChord => chords.isChord(potentialChord.replace(/\./g, '')));
}

export default {
	render(songTxt) {
		const allLines = songTxt
			.split('\n')
			.map(line => {
				return {
					content: line,
					type: isChordLine(line) ? 'chord' : 'text'
				};
			})
			.map(line => {
				if (line.type === 'chord') {
					try {
						const parsed = parseChordLine(line.content);
						const interspaced = simpleChordInterspacer(parsed);

						line.rendered = chordLineRenderer.render(interspaced, {
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
						line.rendered = textLineRenderer.render(line.content);
					}



				} else {
					line.rendered = textLineRenderer.render(line.content);
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
