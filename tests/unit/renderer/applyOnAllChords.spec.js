import applyOnAllChords from '../../../src/renderer/applyOnAllChords';
import parseSong from '../../../src/parseSong';
import parseChordLine from '../../../src/parseChordLine';

describe('applyOnAllChords', () => {
	test('Module', () => {
		expect(applyOnAllChords).toBeInstanceOf(Function);
	});

	test('Does not mutate input', () => {
		const song = `
E E
You don't have to be rich to be my girl
D D
You don't have to be cool to rule my world
E E
Ain't no particular sign I'm more compatible with
D D
I just want your extra time and your...Kiss
		`;
		const parsed = parseSong(song, { parseChordLine });
		const applied = applyOnAllChords(parsed, () => true);

		expect(parsed).not.toBe(applied);
	});
});


describe('Behaviour', () => {
	test('Should apply function on each chord', () => {
		expect.assertions(8);

		const song = `
E E
You don't have to be rich to be my girl
D D
You don't have to be cool to rule my world
E E
Ain't no particular sign I'm more compatible with
D D
I just want your extra time and your...Kiss
		`;
		const parsed = parseSong(song, { parseChordLine });
		const applied = applyOnAllChords(parsed, chord => chord.applied = true);

		applied.forEach(line => {
			if (line.type === 'chord') {
				line.model.allBars.forEach(bar => {
					bar.allChords.forEach(chord => {
						expect(chord.applied).toBe(true);
					});
				});
			}
		});
	});
});
