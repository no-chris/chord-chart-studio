import React from 'react';
import {
	withStore,
	getState,
	resetStore,
	dispatch,
} from '../../helpers/withStore';

import { render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import SongImporter from '../../../../src/songImporter/_containers/SongImporter';
import * as fileSelectors from '../../../../src/db/files/selectors';
import {
	startImport,
	startImportFromWeb,
} from '../../../../src/songImporter/_state/actions';

afterEach(cleanup);

describe('SongImporter', () => {
	beforeEach(resetStore);

	test('Should import a song directly typed in the input field', () => {
		dispatch(startImport());

		const { getByTestId, getByText } = render(withStore(<SongImporter />));

		// check no file exists
		let allFilesTitles = fileSelectors.getAllTitles(getState());
		expect(allFilesTitles.length).toBe(0);

		// check that import is not possible yet
		const importBtn = getByText('IMPORT');
		expect(importBtn).toBeDisabled();

		// type content and import
		const inputField = getByTestId('sim-input');

		userEvent.type(inputField, 'A new song');
		userEvent.click(importBtn);

		// check file exists
		allFilesTitles = fileSelectors.getAllTitles(getState());
		expect(allFilesTitles.length).toBe(1);
		const newFileId = allFilesTitles[0].id;

		const newFile = fileSelectors.getOne(getState(), newFileId);
		expect(newFile.content).toContain('A new song');
	});

	test('Should import a song from a file', async () => {
		dispatch(startImport());

		const { getByLabelText, getByText } = render(
			withStore(<SongImporter />)
		);

		// check no file exists
		let allFilesTitles = fileSelectors.getAllTitles(getState());
		expect(allFilesTitles.length).toBe(0);

		// check that import is not possible yet
		const importBtn = getByText('IMPORT');
		expect(importBtn).toBeDisabled();

		// import file and import
		const file = new File(['Content from file'], 'mySong.chopro', {
			type: 'text/plain',
		});
		file.text = jest
			.fn()
			.mockImplementation(() => Promise.resolve('Content from file'));
		const fileInput = getByLabelText('Select File');

		userEvent.upload(fileInput, file);

		await waitFor(() => expect(importBtn).not.toBeDisabled());
		userEvent.click(importBtn);

		// check file exists
		allFilesTitles = fileSelectors.getAllTitles(getState());
		expect(allFilesTitles.length).toBe(1);
		const newFileId = allFilesTitles[0].id;

		const newFile = fileSelectors.getOne(getState(), newFileId);
		expect(newFile.content).toContain('Content from file');
	});

	test('should import a song from a website', () => {
		dispatch(
			startImportFromWeb(
				'chordpro',
				'[A]Amazing [D7]grace',
				'Amazing Grace'
			)
		);

		const { getByTestId, getByText } = render(withStore(<SongImporter />));

		// check no file exists
		let allFilesTitles = fileSelectors.getAllTitles(getState());
		expect(allFilesTitles.length).toBe(0);

		// check that the file is properly previewed
		const inputField = getByTestId('sim-input');
		expect(inputField).toHaveValue('[A]Amazing [D7]grace');

		const preview = getByTestId('sim-preview');
		expect(preview).toHaveTextContent('A D7 _Amazing _grace');

		// do import
		const importBtn = getByText('IMPORT');
		expect(importBtn).toBeEnabled();

		importBtn.click();

		// check file exists
		allFilesTitles = fileSelectors.getAllTitles(getState());
		expect(allFilesTitles.length).toBe(1);
		const newFileId = allFilesTitles[0].id;

		const newFile = fileSelectors.getOne(getState(), newFileId);
		expect(newFile.content).toContain('A D7\n_Amazing _grace');
	});
});
