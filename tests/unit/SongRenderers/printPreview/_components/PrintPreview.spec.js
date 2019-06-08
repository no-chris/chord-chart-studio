jest.mock('../../../../../src/songRenderers/printPreview/helpers/getAllLinesHeight');
jest.mock('../../../../../src/songRenderers/printPreview/helpers/getPagesHeight');

import _ from 'lodash';
import React from 'react';

import { render, cleanup, act } from '@testing-library/react';
import 'jest-dom/extend-expect';

import 'jest-dom/extend-expect';

import PrintPreview from '../../../../../src/songRenderers/printPreview/_components/PrintPreview';
import getAllLinesHeight from '../../../../../src/songRenderers/printPreview/helpers/getAllLinesHeight';
import getPagesHeight from '../../../../../src/songRenderers/printPreview/helpers/getPagesHeight';


afterEach(cleanup);

describe('PrintPreview', () => {

	let props = {};

	// 200 lines
	const selectedFile = {
		content: '<div class="cmLine">myVerse</div>\n'.repeat(199),
		title: 'myTitle'
	};

	// page 1 => 3 cols => (600/20) = 30 lines per col => 90 lines capacity => 90 used
	// page 2 => 3 cols => (800/20) = 40 lines per col => 120 lines capacity => 110 used
	getAllLinesHeight.mockReturnValue(new Array(selectedFile.content.length).fill(20));
	getPagesHeight.mockReturnValue({ firstPageHeight: 600, normalPageHeight: 800 });


	beforeEach(() => {
		props = {
			selectedFile: _.cloneDeep(selectedFile),
			columnsCount: 3,
			columnBreakOnParagraph: true,
			documentSize: 'a4',
			documentMargins: 3,
			printFontSize: 1,
		};
	});

	describe('Layout', () => {
		test('Should spread all lines over pages and columns', (done) => {
			let result = {};

			act(() => {
				result = render(<PrintPreview {...props} />);
			});

			const { getAllByTestId } = result;

			//fixme: next React release should fix this with async act
			process.nextTick(() => {
				const allPages = getAllByTestId('printPreview-page');

				expect(allPages.length).toBe(2);

				expect(allPages[0].querySelectorAll('.cmLine').length).toBe(90);
				expect(allPages[1].querySelectorAll('.cmLine').length).toBe(110);

				const allColumns = getAllByTestId('printPreview-pageColumn');

				expect(allColumns.length).toBe(6);

				expect(allColumns[0].querySelectorAll('.cmLine').length).toBe(30);
				expect(allColumns[1].querySelectorAll('.cmLine').length).toBe(30);
				expect(allColumns[2].querySelectorAll('.cmLine').length).toBe(30);
				expect(allColumns[3].querySelectorAll('.cmLine').length).toBe(40);
				expect(allColumns[4].querySelectorAll('.cmLine').length).toBe(40);
				expect(allColumns[5].querySelectorAll('.cmLine').length).toBe(30);

				done();
			});
		});
	});


	describe('pageHeader', () => {
		test('Should render pageHeader on first page only', (done) => {
			let result = {};

			act(() => {
				result = render(<PrintPreview {...props} />);
			});

			const { getAllByTestId } = result;

			//fixme: next React release should fix this with async act
			process.nextTick(() => {
				const allPages = getAllByTestId('printPreview-page');

				expect(allPages[0].querySelector('.printPreview-pageHeader')).toBeInstanceOf(Element);
				expect(allPages[1].querySelector('.printPreview-pageHeader')).toBeNull();

				done();
			});
		});
	});


	describe('Formatting options', () => {
		test('Should add relevant classes to support formatting options', (done) => {
			let result = {};

			act(() => {
				result = render(<PrintPreview {...props} />);
			});

			const { getAllByTestId, rerender } = result;

			//fixme: next React release should fix this with async act
			process.nextTick(() => {
				let allPages = getAllByTestId('printPreview-page');
				expect(allPages[0]).toHaveClass('printPreview-page--a4');
				expect(allPages[0]).toHaveClass('printPreview-page--font1');

				let allPageContentWrappers = getAllByTestId('printPreview-pageContentWrapper');
				expect(allPageContentWrappers[0]).toHaveClass('printPreview-pageContentWrapper--padding3');

				act(() => {
					rerender(<PrintPreview
						{...props}
						documentSize={'ipad'}
						documentMargins={-2}
						printFontSize={-4}
					/>);
				});

				process.nextTick(() => {
					allPages = getAllByTestId('printPreview-page');
					expect(allPages[0]).toHaveClass('printPreview-page--ipad');
					expect(allPages[0]).toHaveClass('printPreview-page--font-4');

					allPageContentWrappers = getAllByTestId('printPreview-pageContentWrapper');
					expect(allPageContentWrappers[0]).toHaveClass('printPreview-pageContentWrapper--padding-2');

					done();
				});
			});

		});
	});
});
