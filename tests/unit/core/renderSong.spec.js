jest.mock('@touffi/chord-mark');

import renderSong from '../../../src/core/renderSong';
import { renderSong as renderSongCm, parseSong } from '@touffi/chord-mark';

describe('renderSong', () => {
	test('Module', () => {
		expect(renderSong).toBeInstanceOf(Function);
	});
});

describe('renderSong()', () => {
	test('Test details', () => {
		parseSong.mockImplementation(input => 'parsed: ' + input);
		renderSongCm.mockImplementation(input => 'rendered: ' + input);

		const input = 'mySong';
		const rendered = renderSong(input);

		expect(rendered).toEqual('rendered: parsed: mySong');
	});
});
