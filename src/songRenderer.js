import { Chords } from 'momo-chords';
import replaceMultipleSpaces from './core/string/replaceMultipleSpaces';
import parseChordLine from './parseChordLine';
import createBarMask from './createBarMask';

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
				const allBarsRendered = parsed.allBars
					.map(bar => {
						bar.mask = createBarMask(bar.allChords);
						return bar;
					})
					.map(bar => {
						bar.rendered = bar.mask;
						bar.allChords.forEach((chord, index) => {
							bar.rendered = bar.rendered.replace(
								`{${index}}`,
								chords.print(chords.parse(chord.symbol).symbol)
							);
						});
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
