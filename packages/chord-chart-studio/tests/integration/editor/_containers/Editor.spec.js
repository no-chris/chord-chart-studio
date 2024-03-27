jest.mock('uuid');

import React from 'react';
import { act } from 'react-dom/test-utils';
import { withStore, resetStore, dispatch } from '../../helpers/withStore';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Editor from '../../../../src/editor/_containers/Editor';
import { createFile, updateFile } from '../../../../src/db/files/actions';
import { selectFile } from '../../../../src/fileManager/_state/actions';
import { editorModeChanged } from '../../../../src/ui/layout/app/reducers';

import { v4 as uuidv4 } from 'uuid';
uuidv4.mockReturnValue('myId');

afterEach(cleanup);

describe('Editor', () => {
	beforeEach(() => {
		resetStore();
	});

	test('should survive empty file list', () => {
		const { queryByText } = render(withStore(<Editor />));

		queryByText('New');
	});

	describe('Editor modes', () => {
		beforeEach(() => {
			dispatch(createFile('mySongTitle'));
			dispatch(
				updateFile('myId', {
					content: 'mySongContent',
					title: 'mySongTitle',
				})
			);
			dispatch(selectFile('myId'));
		});

		test('Edit', () => {
			dispatch(editorModeChanged('edit'));

			const { getAllByText } = render(withStore(<Editor />));

			// song is rendered 2 times: once in editor, once in editor preview
			expect(getAllByText('mySongContent').length).toBe(2);
		});

		test('Play', () => {
			dispatch(editorModeChanged('play'));

			const { getAllByText } = render(withStore(<Editor />));

			expect(getAllByText('mySongContent').length).toBe(1);
		});

		test('Print', async () => {
			let result = {};

			dispatch(editorModeChanged('print'));

			await act(async () => {
				result = render(withStore(<Editor />));
			});

			const { getAllByTestId } = result;

			expect(getAllByTestId('printPreview').length).toBe(1);
		});

		test('Export', () => {
			dispatch(editorModeChanged('export'));

			const { getAllByText } = render(withStore(<Editor />));

			expect(getAllByText('mySongContent').length).toBe(1);
		});

		test('In export mode, "Select all" only select export content', async () => {
			dispatch(editorModeChanged('export'));

			const selection = window.getSelection();

			render(withStore(<Editor />));

			await userEvent.keyboard('{Meta>}{a}');
			expect(selection.toString()).toBe('mySongContent');

			selection.removeAllRanges();
			expect(selection.toString()).toBe('');

			await userEvent.keyboard('{Control>}{a}');
			expect(selection.toString()).toBe('mySongContent');
		});
	});
});
