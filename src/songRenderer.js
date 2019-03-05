import { Chords } from 'momo-chords';
import replaceMultipleSpaces from './core/string/replaceMultipleSpaces';
import parseChordLine from './parseChordLine';

import simpleChordInterspacer from './interspacer/chord/simple';
import textBarRenderer from './renderer/bar/text';
import momoChordRenderer from './renderer/chord/momo';

import InvalidChordRepetitionException from './exceptions/InvalidChordRepetitionException';
import IncorrectBeatCountException from './exceptions/IncorrectBeatCountException';

const chords = new Chords();

function isChordLine(line) {
	return replaceMultipleSpaces(line, ' ')
		.trim()
		.split(' ')
		.every(potentialChord => chords.isChord(potentialChord.replace(/\./g, '')));
}

export default function songRendererFactory(songTxt) {
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

					const allBarsRendered = interspaced.allBars
						.map(bar => {
							bar.rendered = textBarRenderer.render(bar, { chordRenderer: momoChordRenderer });
							return bar.rendered;
						});

					line.rendered = '| ' + allBarsRendered.join(' | ') + ' |';
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
					line.rendered = line.content;
				}



			} else {
				line.rendered = line.content;
			}
			return line;
		});


	return {
		render() {
			return allLines
				.map(line => line.rendered)
				.join('\n');
		},

		toString() {
			return this.render();
		}
	};
}
