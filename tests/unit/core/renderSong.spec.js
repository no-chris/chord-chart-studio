jest.mock('chord-mark', () => ({
	parseSong: jest.fn(),
	renderSong: jest.fn(),
}));

import { parseSong, renderSong } from 'chord-mark';
import renderCmSong from '../../../src/core/renderSong';

describe('renderCmSong', () => {
	test('Module', () => {
		expect(renderCmSong).toBeInstanceOf(Function);
	});
});

describe('renderCmSong()', () => {
	test('Should render song', () => {
		parseSong.mockImplementation((song) => song);
		renderSong.mockImplementation((parsed) => parsed);

		const input = 'mySong';
		const rendered = renderCmSong(input);

		expect(rendered).toEqual('mySong');
	});

	test('Should return error message in case exception is thrown', () => {
		renderSong.mockImplementation(() => {
			throw new Error('ChordMark Error');
		});

		const input = 'mySong';
		const rendered = renderCmSong(input);

		expect(rendered).toEqual('ChordMark Error');
	});
});
