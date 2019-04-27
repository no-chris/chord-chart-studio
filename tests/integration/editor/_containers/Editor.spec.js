jest.mock('uuid');

import React from 'react';
import { withStore, resetStore, dispatch } from '../../helpers/withStore';

import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Editor from '../../../../src/editor/_containers/Editor';
import { createFile, updateFile } from '../../../../src/db/files/actions';
import { selectFile } from '../../../../src/fileManager/_state/actions';
import { setEditorMode } from '../../../../src/ui/layout/app/_state/actions';

import uuid from 'uuid';
uuid.v4.mockReturnValue('myId');

afterEach(cleanup);

describe('Editor', () => {
	beforeEach(() => {
		resetStore();

		dispatch(createFile('mySongTitle'));
		dispatch(updateFile('myId', {
			content: 'mySongContent',
			title: 'mySongTitle'
		}));
		dispatch(selectFile('myId'));
	});

	describe('Editor modes', () => {
		test('Edit', () => {
			dispatch(setEditorMode('edit'));

			const { getAllByText } = render(withStore(
				<Editor />
			));

			// song is rendered 2 times: once in editor, once in editor preview
			expect(getAllByText('mySongContent').length).toBe(2);
		});

		test('Play', () => {
			dispatch(setEditorMode('play'));

			const { getAllByText } = render(withStore(
				<Editor />
			));

			expect(getAllByText('mySongContent').length).toBe(1);
		});

		test('Print', () => {
			dispatch(setEditorMode('print'));

			const { getAllByTestId } = render(withStore(
				<Editor />
			));

			expect(getAllByTestId('printPreview').length).toBe(1);
		});

		test('Export', () => {
			dispatch(setEditorMode('export'));

			const { getAllByText } = render(withStore(
				<Editor />
			));

			expect(getAllByText('mySongContent').length).toBe(1);
		});
	});
});
