jest.mock('@touffi/ucc');

import renderSong from '../../../src/core/renderSong';
import { renderSong as renderSongUcc, parseSong } from '@touffi/ucc';

describe('renderSong', () => {
	test('Module', () => {
		expect(renderSong).toBeInstanceOf(Function);
	});
});

describe('renderSong()', () => {
	test('Test details', () => {
		parseSong.mockImplementation(input => 'parsed: ' + input);
		renderSongUcc.mockImplementation(input => 'rendered: ' + input);

		const input = 'mySong';
		const rendered = renderSong(input);

		expect(rendered).toEqual('rendered: parsed: mySong');
	});
});
