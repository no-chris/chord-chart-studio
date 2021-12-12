import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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
				'<p class="cmLine"><span class="cmEmptyLine">&nbsp;</span></p>\n' +
					'<p class="cmLine"><span class="cmChordLine">' +
					'<span class="cmBarSeparator">|</span>' +
					'<span class="cmBarContent"><span class="cmChordSymbol">A</span>    </span><span class="cmBarSeparator">|</span>' +
					'</span></p>\n' +
					'<p class="cmLine"><span class="cmLyricLine">mySong</span></p>'
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
				'<p>&nbsp;</p>\n<p>A</p>\n<p>_mySong</p>'
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
				'<p>&nbsp;</p>\n<p>[A]mySong</p>'
			);
		});
	});
});
