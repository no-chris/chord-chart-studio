import path from 'path';
import fs from 'fs';

import songRendererFactory from '../../../src/songRenderer';

const dataFolder = path.resolve(__dirname, 'data');

describe('songRenderer', () => {
	test('Factory', () => {
		expect(songRendererFactory).toBeInstanceOf(Function);
	});

	test('Instance API', () => {
		const songRenderer = songRendererFactory('test');
		expect(songRenderer.render).toBeInstanceOf(Function);
		expect(songRenderer.toString).toBeInstanceOf(Function);
	});

});

describe.each([
	['song1', 'song1-input.txt', 'song1-output.txt' ],
])('Render %s',
	(title, inputFile, outputFile) => {
		test('toString()', () => {
			const input = fs.readFileSync(path.resolve(dataFolder, inputFile), 'utf8');
			const output = fs.readFileSync(path.resolve(dataFolder, outputFile), 'utf8');

			const songRenderer = songRendererFactory(input);

			expect(songRenderer.toString()).toEqual(output);
		});
	});
