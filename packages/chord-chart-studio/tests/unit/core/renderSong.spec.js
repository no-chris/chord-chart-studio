import { renderAsHtml, renderAsText } from '../../../src/core/renderSong';

describe('renderCmSong', () => {
	test('Module', () => {
		expect(renderAsHtml).toBeInstanceOf(Function);
		expect(renderAsText).toBeInstanceOf(Function);
	});
});

describe('renderAsHtml()', () => {
	test('Should return error message in case exception is thrown', () => {
		const input = () => 'should throw';
		const rendered = renderAsHtml(input);

		expect(rendered).toEqual('songSrc.split is not a function');
	});

	test('Should return ChordMark html by default, with wrappable chord/lyric lines', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(input);

		expect(rendered).toEqual(
			'<div class="cmSong">' +
				'<p class="cmLine">' +
				'<span class="cmChordLyricLine">' +
				'<span class="cmChordLyricPair">' +
				'<span class="cmChordLine"><span class="cmBarSeparator">|</span></span>' +
				'<span class="cmLyricLine"> </span>' +
				'</span>' +
				'<span class="cmChordLyricPair">' +
				'<span class="cmChordLine"><span class="cmChordSymbol">A</span>     </span>' +
				'<span class="cmLyricLine">mySong</span>' +
				'</span>' +
				'<span class="cmChordLyricPair">' +
				'<span class="cmChordLine"><span class="cmBarSeparator">|</span></span>' +
				'<span class="cmLyricLine"></span></span></span></p>' +
				'<p class="cmLine"><span class="cmEmptyLine">&nbsp;</span></p>' +
				'</div>'
		);
	});

	test('Should also return ChordMark html with useChartFormat === true & chartFormat === chordmark, lines NO wrappable', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(
			input,
			{ chartFormat: 'chordmark' },
			true
		);

		expect(rendered).toEqual(
			'<div class="cmSong">' +
				'<p class="cmLine"><span class="cmChordLine">' +
				'<span class="cmBarSeparator">|</span><span class="cmChordSymbol">A</span>     <span class="cmBarSeparator">|</span>' +
				'</span></p>' +
				'<p class="cmLine"><span class="cmLyricLine"> mySong</span></p>' +
				'<p class="cmLine"><span class="cmEmptyLine">&nbsp;</span></p>' +
				'</div>'
		);
	});

	test('Should return ChordPro html with useChartFormat === true & chartFormat === chordpro', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(input, { chartFormat: 'chordpro' }, true);

		expect(rendered).toEqual(
			'<span class="txtLine">[|] [A]mySong [|]</span>'
		);
	});

	test('Should return Ultimate Guitar html with useChartFormat === true & chartFormat === ultimateGuitar', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(
			input,
			{ chartFormat: 'ultimateGuitar' },
			true
		);

		expect(rendered).toEqual(
			'<span class="txtLine">[ch]A[/ch]</span><span class="txtLine">mySong</span><span class="txtLine">&nbsp;</span>' +
				'<span class="txtLine">&nbsp;</span><span class="txtLine">Created with Chord Chart Studio (https://chord-chart-studio.netlify.app)</span>'
		);
	});

	test('Should return ChordMark source html with useChartFormat === true & chartFormat === chordmarkSrc', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(
			input,
			{ chartFormat: 'chordmarkSrc' },
			true
		);

		expect(rendered).toEqual(
			'<span class="txtLine">A</span><span class="txtLine">_mySong</span><span class="txtLine">&nbsp;</span>'
		);
	});
});

describe('renderAsText()', () => {
	test('Should return error message in case exception is thrown', () => {
		const input = () => 'should throw';
		const rendered = renderAsHtml(input);

		expect(rendered).toEqual('songSrc.split is not a function');
	});

	test('Should return ChordMark txt by default', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsText(input);

		expect(rendered).toEqual('| A     mySong|\n');
	});

	test('Should return ChordMark text with useChartFormat === true & chartFormat === chordmark', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsText(
			input,
			{ chartFormat: 'chordmark' },
			true
		);

		expect(rendered).toEqual('|A     |\n mySong\n');
	});

	test('Should return ChordPro text with useChartFormat === true & chartFormat === chordpro', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsText(input, { chartFormat: 'chordpro' }, true);

		expect(rendered).toEqual('[|] [A]mySong [|]');
	});

	test('Should return Ultimate Guitar text with useChartFormat === true & chartFormat === ultimateGuitar', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsText(
			input,
			{ chartFormat: 'ultimateGuitar' },
			true
		);

		expect(rendered).toEqual(
			'[ch]A[/ch]\nmySong\n' +
				'\n\nCreated with Chord Chart Studio (https://chord-chart-studio.netlify.app)'
		);
	});

	test('Should return ChordMark source text with useChartFormat === true & chartFormat === chordmarkSrc', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsText(
			input,
			{ chartFormat: 'chordmarkSrc' },
			true
		);

		expect(rendered).toEqual('A\n_mySong\n');
	});
});
