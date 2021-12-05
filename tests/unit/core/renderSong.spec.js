import renderCmSong, {
	renderSongAsChordPro,
} from '../../../src/core/renderSong';

describe('renderCmSong', () => {
	test('Module', () => {
		expect(renderCmSong).toBeInstanceOf(Function);
		expect(renderSongAsChordPro).toBeInstanceOf(Function);
	});
});

describe('renderCmSong()', () => {
	test('Should render song', () => {
		const input = 'mySong';
		const rendered = renderCmSong(input);

		expect(rendered).toEqual(
			'<p class="cmLine"><span class="cmLyricLine">mySong</span></p>'
		);
	});

	test('Should return error message in case exception is thrown', () => {
		jest.doMock('chord-mark', () => ({
			parseSong: jest.fn(),
			renderSong: jest.fn().mockImplementation(() => {
				throw new Error('ChordMark Error');
			}),
		}));

		const input = () => 'should throw';
		const rendered = renderCmSong(input);

		expect(rendered).toEqual('songSrc.split is not a function');
	});
});

describe('renderSongAsChordPro()', () => {
	test('Should call renderSong with the chordpro converter as custom renderer', () => {
		const input = 'A\n_mySong';
		const rendered = renderSongAsChordPro(input);

		expect(rendered).toEqual('[A]mySong');
	});
});
