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

	test('Should return ChordMark html by default', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(input);

		expect(rendered).toEqual(
			'<div class="cmSong">' +
				'<p class="cmLine"><span class="cmChordLine">' +
				'<span class="cmBarSeparator">|</span><span class="cmBarContent"><span class="cmChordSymbol">A</span>    </span><span class="cmBarSeparator">|</span>' +
				'</span></p>\n' +
				'<p class="cmLine"><span class="cmLyricLine">mySong</span></p>\n' +
				'<p class="cmLine"><span class="cmEmptyLine">&nbsp;</span></p>' +
				'</div>'
		);
	});

	test('Should also return ChordMark html with useChartFormat === true & chartFormat === chordmark', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(
			input,
			{ chartFormat: 'chordmark' },
			true
		);

		expect(rendered).toEqual(
			'<div class="cmSong">' +
				'<p class="cmLine"><span class="cmChordLine">' +
				'<span class="cmBarSeparator">|</span><span class="cmBarContent"><span class="cmChordSymbol">A</span>    </span><span class="cmBarSeparator">|</span>' +
				'</span></p>\n' +
				'<p class="cmLine"><span class="cmLyricLine">mySong</span></p>\n' +
				'<p class="cmLine"><span class="cmEmptyLine">&nbsp;</span></p>' +
				'</div>'
		);
	});

	test('Should return ChordPro html with useChartFormat === true & chartFormat === chordpro', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(input, { chartFormat: 'chordpro' }, true);

		expect(rendered).toEqual('<p>[A]mySong</p>\n<p>&nbsp;</p>');
	});

	test('Should return ChordMark source html with useChartFormat === true & chartFormat === chordmarkSrc', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsHtml(
			input,
			{ chartFormat: 'chordmarkSrc' },
			true
		);

		expect(rendered).toEqual('<p>A</p>\n<p>_mySong</p>\n<p>&nbsp;</p>');
	});
});

describe('renderAsText()', () => {
	test('Should return error message in case exception is thrown', () => {
		const input = () => 'should throw';
		const rendered = renderAsText(input);

		expect(rendered).toEqual('songSrc.split is not a function');
	});

	test('Should return ChordMark txt by default', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsText(input);

		expect(rendered).toEqual('|A    |\nmySong\n');
	});

	test('Should return ChordMark text with useChartFormat === true & chartFormat === chordmark', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsText(
			input,
			{ chartFormat: 'chordmark' },
			true
		);

		expect(rendered).toEqual('|A    |\nmySong\n');
	});

	test('Should return ChordPro text with useChartFormat === true & chartFormat === chordpro', () => {
		const input = 'A\n_mySong\n';
		const rendered = renderAsText(input, { chartFormat: 'chordpro' }, true);

		expect(rendered).toEqual('[A]mySong\n');
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
