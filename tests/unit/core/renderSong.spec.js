import renderSong from '../../../src/core/renderSong';

describe('renderSong', () => {
	test('Module', () => {
		expect(renderSong).toBeInstanceOf(Function);
	});
});

describe('renderSong()', () => {
	test('Test details', () => {
		const input = 'mySong';
		const rendered = renderSong(input);

		expect(rendered).toEqual(
			'<p class="cmLine"><span class="cmLyricLine">mySong</span></p>'
		);
	});
});
