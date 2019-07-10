jest.mock('../../../../../src/songRenderers/_containers/SongRenderer');

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
			chordsColor: 'yellow',
			highlightChords: true,
		};
	});

	describe('CSS classes', () => {
		test('Should add correct class for columnsCount', () => {
			let { getByTestId, rerender } = render(<PlayRenderer
				{...props}
				columnsCount={3}
			/>);

			const element = getByTestId('playRenderer');

			expect(element).toHaveClass('playRenderer--columns-3');

			rerender(<PlayRenderer
				{...props}
				columnsCount={4}
			/>);

			expect(element).toHaveClass('playRenderer--columns-4');
		});

		test('Should add correct class for fontSize', () => {
			let { getByTestId, rerender } = render(<PlayRenderer
				{...props}
				fontSize={-3}
			/>);

			const element = getByTestId('playRenderer');

			expect(element).toHaveClass('cmLine--fontSize-3');

			rerender(<PlayRenderer
				{...props}
				fontSize={4}
			/>);

			expect(element).toHaveClass('cmLine--fontSize4');
		});

		test('Should add correct class for chordsColor', () => {
			let { getByTestId, rerender } = render(<PlayRenderer
				{...props}
				chordsColor={'red'}
			/>);

			const element = getByTestId('playRenderer');

			expect(element).toHaveClass('cmChordSymbol--chordsColor-red');

			rerender(<PlayRenderer
				{...props}
				chordsColor={'green'}
			/>);

			expect(element).toHaveClass('cmChordSymbol--chordsColor-green');
		});

		test('Should add correct class for highlightChords', () => {
			let { getByTestId, rerender } = render(<PlayRenderer
				{...props}
				highlightChords={true}
			/>);

			const element = getByTestId('playRenderer');

			expect(element).toHaveClass('cmChordLine--highlightChords');

			rerender(<PlayRenderer
				{...props}
				highlightChords={false}
			/>);

			expect(element).not.toHaveClass('cmChordLine--highlightChords');
		});
	});

});
