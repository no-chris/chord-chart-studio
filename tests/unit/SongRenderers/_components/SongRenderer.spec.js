jest.mock('../../../../src/core/renderSong');

import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SongRenderer from '../../../../src/songRenderers/_components/SongRenderer';
import renderSong from '../../../../src/core/renderSong';

afterEach(cleanup);

describe('SongRenderer', () => {
	let props = {};

	beforeEach(() => {
		props = {
			content: 'mySongContent',
		};
	});

	describe('Rendering', () => {
		test('Should render raw HTML returned from renderSong()', () => {
			renderSong.mockImplementation(
				(songTxt) =>
					'some <strong>HTML</strong> wrapping <span>' +
					songTxt +
					' </span>'
			);

			const { container } = render(<SongRenderer {...props} />);

			expect(container.firstChild.firstChild.innerHTML).toBe(
				'some <strong>HTML</strong> wrapping <span>mySongContent </span>'
			);
		});
	});
});
