import path from 'path';
import fs from 'fs';

import songRenderer from '../../../../src/renderer/song/song';
import isRenderer from '../../../../src/renderer/isRenderer';
import stripTags from '../../../../src/core/dom/stripTags';

const dataFolder = path.resolve(__dirname, 'data');

describe('songRenderer', () => {
	test('Factory', () => {
		expect(songRenderer).toBeInstanceOf(Object);
	});

	test('isRenderer', () => {
		expect(isRenderer(songRenderer)).toEqual(true);
	});

});

describe.each([

	['song1', 'song1-input.txt', 'song1-output-simple.txt', undefined ],
	['song1', 'song1-input.txt', 'song1-output-simple.txt', false ],
	['song1', 'song1-input.txt', 'song1-output-aligned.txt', true ],

])('Render %s', (title, inputFile, outputFile, alignChords) => {
	test('render()', () => {
		const input = fs.readFileSync(path.resolve(dataFolder, inputFile), 'utf8');
		const output = fs.readFileSync(path.resolve(dataFolder, outputFile), 'utf8');

		const rendered = songRenderer.render(input, { alignChords });

		expect(stripTags(rendered)).toEqual(output);
	});
});
