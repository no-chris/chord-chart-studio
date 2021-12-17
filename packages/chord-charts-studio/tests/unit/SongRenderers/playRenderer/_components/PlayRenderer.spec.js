jest.mock(
	'../../../../../src/songRenderers/_containers/SongRenderer',
	() => () => 'MySong'
);

import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import '@testing-library/jest-dom/extend-expect';

import PlayRenderer from '../../../../../src/songRenderers/playRenderer/_components/PlayRenderer';

afterEach(cleanup);

describe('PlayRenderer', () => {
	let props = {};

	beforeEach(() => {
		props = {
			selectedFile: { content: 'myContent', title: 'myTitle' },
			columnsCount: 1,
			fontSize: 0,
		};
	});

	describe('CSS classes', () => {
		test('Should add correct class for columnsCount', () => {
			let { getByTestId, rerender } = render(
				<PlayRenderer {...props} columnsCount={3} />
			);

			const element = getByTestId('playRenderer');

			expect(element).toHaveClass('playRenderer--columns-3');

			rerender(<PlayRenderer {...props} columnsCount={4} />);

			expect(element).toHaveClass('playRenderer--columns-4');
		});

		test('Should add correct class for fontSize', () => {
			let { getByTestId, rerender } = render(
				<PlayRenderer {...props} fontSize={-3} />
			);

			const element = getByTestId('playRenderer');

			expect(element).toHaveClass('cmSong--fontSize-3');

			rerender(<PlayRenderer {...props} fontSize={4} />);

			expect(element).toHaveClass('cmSong--fontSize4');
		});
	});
});
