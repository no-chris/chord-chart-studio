jest.mock('chord-mark-converters', () => ({ convert2ChordMark: jest.fn() }));
import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import SongImporter from '../../../../src/songImporter/_components/SongImporter';
import { convert2ChordMark } from 'chord-mark-converters';

afterEach(cleanup);

describe('SongImporter', () => {
	let props = {};

	const cancelImport = jest.fn();
	const importFile = jest.fn();
	const setContent = jest.fn();
	const setInputFormat = jest.fn();

	beforeEach(() => {
		props = {
			content: 'myContent',
			isFromWeb: false,
			isImporting: true,
			inputFormat: 'ultimateGuitar',
			title: 'myTitle',

			cancelImport,
			importFile,
			setContent,
			setInputFormat,
		};

		cancelImport.mockReset();
		importFile.mockReset();
		setContent.mockReset();
		setInputFormat.mockReset();
		convert2ChordMark.mockImplementation((input) => input);
	});

	test('should not render import modal if isImporting = false', () => {
		const { queryByTestId } = render(
			<SongImporter {...props} isImporting={false} />
		);
		expect(queryByTestId('modal-overlay')).toBeNull();
		expect(queryByTestId('song-importer')).toBeNull();
	});

	test('should render import modal if isImporting = true', () => {
		const { getByTestId } = render(<SongImporter {...props} />);
		expect(getByTestId('modal-overlay')).toBeInTheDocument();
		expect(getByTestId('song-importer')).toBeInTheDocument();
	});

	describe('HeaderBar', () => {
		test('should display title if defined', () => {
			const { getByText } = render(<SongImporter {...props} />);

			expect(getByText('Import "myTitle"')).toBeInTheDocument();
		});

		test('should display generic title otherwise if defined', () => {
			const { getByText } = render(
				<SongImporter {...props} title={''} />
			);

			expect(getByText('Import song')).toBeInTheDocument();
		});
	});

	describe('Cancel button', () => {
		test('Should call cancelImport()', () => {
			const { getByText } = render(<SongImporter {...props} />);
			const cancelBtn = getByText('CANCEL');

			cancelBtn.click();

			expect(cancelImport).toHaveBeenCalledTimes(1);
		});
	});

	describe('Import button', () => {
		test('should be disabled if content is empty', () => {
			const { getByText } = render(
				<SongImporter {...props} content={''} />
			);
			const importBtn = getByText('IMPORT');
			expect(importBtn).toBeInTheDocument();

			importBtn.click();

			expect(importFile).not.toHaveBeenCalled();
			expect(importBtn).toHaveClass('Button-isDisabled');
		});

		test('should be disabled in case of parsing error', () => {
			convert2ChordMark.mockImplementation(() => {
				throw new Error('Parsing Error');
			});
			const { getByText } = render(<SongImporter {...props} />);
			const importBtn = getByText('IMPORT');
			expect(importBtn).toBeInTheDocument();

			importBtn.click();

			expect(importFile).not.toHaveBeenCalled();
			expect(importBtn).toHaveClass('Button-isDisabled');
		});

		test('should call importFile() with content and title', () => {
			const { getByText } = render(<SongImporter {...props} />);
			const importBtn = getByText('IMPORT');
			expect(importBtn).toBeInTheDocument();

			importBtn.click();

			expect(importFile).toHaveBeenCalledWith('myTitle', 'myContent');
		});

		test('should call importFile() with default title if none is defined', () => {
			const { getByText } = render(
				<SongImporter {...props} title={''} />
			);
			const importBtn = getByText('IMPORT');
			expect(importBtn).toBeInTheDocument();

			importBtn.click();

			expect(importFile).toHaveBeenCalledWith('[untitled]', 'myContent');
		});
	});

	describe('Input field', () => {
		test('Should set proper value', async () => {
			const { getByTestId } = render(<SongImporter {...props} />);
			const textarea = getByTestId('sim-input');

			await userEvent.type(textarea, 'A');

			expect(setContent).toHaveBeenCalledWith('myContentA');
		});

		test('Should be disabled in case of web import', async () => {
			const { getByTestId } = render(
				<SongImporter {...props} isFromWeb={true} />
			);
			const textarea = getByTestId('sim-input');

			await userEvent.type(textarea, 'A');

			expect(setContent).not.toHaveBeenCalled();
			expect(textarea).toHaveClass('sim-Input_Textarea-Disabled');
		});
	});

	describe('Preview box', () => {
		test('Should display converted input', () => {
			convert2ChordMark.mockImplementation(
				(input) => 'converted input ' + input
			);
			const { getByText } = render(<SongImporter {...props} />);
			expect(getByText('converted input myContent')).toBeInTheDocument();
		});

		test('Should display error if input2chordmark fails', () => {
			convert2ChordMark.mockImplementation(() => {
				throw new Error('This is a parsing Error!');
			});
			const { getByText } = render(<SongImporter {...props} />);
			expect(
				getByText('This is a parsing Error!', { exact: false })
			).toBeInTheDocument();
		});
	});

	describe('Input format selector', () => {
		test('Should set proper value on click', () => {
			const { getByLabelText, rerender } = render(
				<SongImporter {...props} inputFormat={'auto'} />
			);
			const auto = getByLabelText('Detect');
			const chordpro = getByLabelText('Bracketed chords (ChordPro)');
			const chordsOverLyrics = getByLabelText(
				'Chords over lyrics (Ultimate Guitar...)'
			);

			expect(auto).toBeChecked();
			auto.click();
			expect(setInputFormat).not.toHaveBeenCalled();

			chordpro.click();
			chordsOverLyrics.click();

			rerender(<SongImporter {...props} inputFormat={'chordpro'} />);

			auto.click();

			expect(setInputFormat).toHaveBeenCalledTimes(3);
			expect(setInputFormat).toHaveBeenNthCalledWith(1, 'chordPro');
			expect(setInputFormat).toHaveBeenNthCalledWith(
				2,
				'chordsOverLyrics'
			);
			expect(setInputFormat).toHaveBeenNthCalledWith(3, 'auto');
		});

		test('should be disabled when importing from the web', () => {
			const { getByLabelText } = render(
				<SongImporter {...props} isFromWeb={true} />
			);
			const auto = getByLabelText('Detect');
			const chordpro = getByLabelText('Bracketed chords (ChordPro)');
			const chordsOverLyrics = getByLabelText(
				'Chords over lyrics (Ultimate Guitar...)'
			);

			expect(auto).not.toBeDisabled();
			expect(chordpro).not.toBeDisabled();
			expect(chordsOverLyrics).not.toBeDisabled();

			expect(auto).toHaveClass('sim-InputFormat_Entry-Disabled');
			expect(chordpro).toHaveClass('sim-InputFormat_Entry-Disabled');
			expect(chordsOverLyrics).toHaveClass(
				'sim-InputFormat_Entry-Disabled'
			);

			auto.click();
			chordpro.click();
			chordsOverLyrics.click();

			expect(setInputFormat).not.toHaveBeenCalled();
		});
	});

	describe('File input', () => {
		test('should call setContent() if proper file is given', async () => {
			const file = new File(['myFileContent'], 'mySongTitle.png', {
				type: 'text/*',
			});
			file.text = () => Promise.resolve('myFileContent');

			const { getByLabelText } = render(<SongImporter {...props} />);
			const fileInput = getByLabelText('Select File');

			await userEvent.upload(fileInput, file);

			return waitFor(() => {
				expect(setContent).toHaveBeenCalledWith(
					'myFileContent',
					'mySongTitle'
				);
			});
		});

		test('should call setContent() with the error message in case file cannot be parsed', async () => {
			const file = new File(['myFileContent'], 'mySongTitle.png', {
				type: 'text/*',
			});
			file.text = () => Promise.reject('Parsing Error!');

			const { getByLabelText } = render(<SongImporter {...props} />);
			const fileInput = getByLabelText('Select File');

			await userEvent.upload(fileInput, file);

			return waitFor(() => {
				expect(setContent).toHaveBeenCalledWith('Parsing Error!');
			});
		});
	});
});
