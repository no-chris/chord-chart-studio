import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import SongRenderer from '../../../../src/songRenderers/_components/SongRenderer';

afterEach(cleanup);

describe('SongRenderer', () => {
	let props = {};

	beforeEach(() => {
		props = {
			content: '\nA\n_mySong',
			chartFormat: 'chordmark',
			useChartFormat: false,
		};
	});

	describe('Rendering', () => {
		test('For ChordMark, should render raw HTML returned from renderSong()', () => {
			const { container } = render(<SongRenderer {...props} />);

			expect(container.firstChild.firstChild.innerHTML).toBe(
				'<div class="cmSong">' +
					'<p class="cmLine"><span class="cmEmptyLine">&nbsp;</span></p>' +
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
					'</div>'
			);
		});

		test('For ChordMark (Source), should build <p> wrapped lines of a ChordMark source', () => {
			const { container } = render(
				<SongRenderer
					{...props}
					chartFormat={'chordmarkSrc'}
					useChartFormat={true}
				/>
			);

			expect(container.firstChild.firstChild.innerHTML).toBe(
				'<span class="txtLine">&nbsp;</span><span class="txtLine">A</span><span class="txtLine">_mySong</span>'
			);
		});

		test('For ChordPro, should build <p> wrapped lines of a ChordPro rendering', () => {
			const { container } = render(
				<SongRenderer
					{...props}
					chartFormat={'chordpro'}
					useChartFormat={true}
				/>
			);

			expect(container.firstChild.firstChild.innerHTML).toBe(
				'<span class="txtLine">[|] [A]mySong [|]</span>'
			);
		});
	});
});
