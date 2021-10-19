import React from 'react';
import { withStore, getState, resetStore } from '../../helpers/withStore';

import { render, cleanup, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FileManager from '../../../../src/fileManager/_containers/FileManager';
import * as fileSelectors from '../../../../src/db/files/selectors';
import * as fmSelectors from '../../../../src/fileManager/_state/selectors';

afterEach(cleanup);

describe('FileManager', () => {
	beforeEach(resetStore);

	describe('Actions', () => {
		test('Should create a new file', () => {
			const { getByText, getByDisplayValue } = render(
				withStore(<FileManager />)
			);

			// Check no file exists
			let allFiles = fileSelectors.getAllTitles(getState());
			expect(allFiles.length).toBe(0);

			// Create new File
			const newFileBtn = getByText('New');
			act(() => {
				fireEvent.click(newFileBtn);
			});

			// Check input has focus
			const newFileName = fmSelectors.getDefaultTitle(getState());
			const newFileInput = getByDisplayValue(newFileName);

			expect(newFileInput).toBe(document.activeElement);

			// Check file exists
			allFiles = fileSelectors.getAllTitles(getState());
			expect(allFiles.length).toBe(1);
		});

		// test('Should rename file', async () => {
		// 	Did not find a way to test this because of strange behavior with focus
		// });

		test('Should delete a file', () => {
			const { getByText } = render(withStore(<FileManager />));

			// Check no file exists
			let allFiles = fileSelectors.getAllTitles(getState());
			expect(allFiles.length).toBe(0);

			// Create new File
			const newFileBtn = getByText('New');
			act(() => {
				fireEvent.click(newFileBtn);
			});

			// Check file exists
			allFiles = fileSelectors.getAllTitles(getState());
			expect(allFiles.length).toBe(1);

			// Delete file
			const deleteFileBtn = getByText('Delete');
			act(() => {
				fireEvent.click(deleteFileBtn);
			});

			// Check file has been removed
			allFiles = fileSelectors.getAllTitles(getState());
			expect(allFiles.length).toBe(0);
		});
	});
});
