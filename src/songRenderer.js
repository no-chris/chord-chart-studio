import { Chords } from 'momo-chords';
import replaceMultipleSpaces from './core/string/replaceMultipleSpaces';
import parseChordLine from './parseChordLine';

import simpleChordInterspacer from './interspacer/chord/simple';
import textBarRenderer from './renderer/bar/text';
import momoChordRenderer from './renderer/chord/momo';

const chords = new Chords();

function isChordLine(line) {
	return replaceMultipleSpaces(line, ' ')
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
				const parsed = parseChordLine(line.content);
				const interspaced = simpleChordInterspacer(parsed);

				const allBarsRendered = interspaced.allBars
					.map(bar => {
						bar.rendered = textBarRenderer.render(bar, { chordRenderer: momoChordRenderer });
						return bar.rendered;
					});

				line.rendered = '| ' + allBarsRendered.join(' | ') + ' |';

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
