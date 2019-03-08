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
	['song1', 'song1-input.txt', 'song1-output.txt' ],
])('Render %s',
	(title, inputFile, outputFile) => {
		test('render()', () => {
			const input = fs.readFileSync(path.resolve(dataFolder, inputFile), 'utf8');
			const output = fs.readFileSync(path.resolve(dataFolder, outputFile), 'utf8');

			expect(stripTags(songRenderer.render(input))).toEqual(output);
		});
	});
