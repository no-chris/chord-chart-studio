jest.mock('../../../../src/fileManager/exportSelectedFileAsText');

import React from 'react';

import { render, cleanup, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FileManager from '../../../../src/fileManager/_components/FileManager';
import exportSelectedFileAsText from '../../../../src/fileManager/exportSelectedFileAsText';

afterEach(cleanup);

describe('FileManager', () => {
	let props = {};

	const selectFile = jest.fn();
	const createFile = jest.fn();
	const deleteFile = jest.fn();
	const enableRename = jest.fn();
	const updateFile = jest.fn();
	const startImport = jest.fn();
	const setEditorMode = jest.fn();

	window.getSelection = () => ({
		removeAllRanges: jest.fn(),
	});

	window.print = jest.fn();

	beforeEach(() => {
		props = {
			allTitles: [
				{ id: 'id1', title: 'title1' },
				{ id: 'id2', title: 'title2' },
				{ id: 'id3', title: 'title3' },
				{ id: 'id4', title: 'title4' },
				{ id: 'id5', title: 'title5' },
			],
			selected: 'id1',
			renamed: '',
			defaultTitle: 'new file',

			selectFile,
			createFile,
			deleteFile,
			enableRename,
			updateFile,
			startImport,
			setEditorMode,
		};

		selectFile.mockReset();
		createFile.mockReset();
		deleteFile.mockReset();
		enableRename.mockReset();
		updateFile.mockReset();
		startImport.mockReset();
	});

	describe('Action list', () => {
		test('should render files titles as value of input fields', () => {
			const { getByText } = render(<FileManager {...props} />);
			getByText('New');
			getByText('Rename');
			getByText('Delete');
		});
	});

	describe('File list', () => {
		test('should render files titles as value of input fields', () => {
			const { getByDisplayValue } = render(<FileManager {...props} />);
			getByDisplayValue(props.allTitles[0].title);
			getByDisplayValue(props.allTitles[1].title);
			getByDisplayValue(props.allTitles[2].title);
			getByDisplayValue(props.allTitles[3].title);
			getByDisplayValue(props.allTitles[4].title);
		});

		test('input fields should be read only', () => {
			const { getByDisplayValue } = render(<FileManager {...props} />);
			const input1 = getByDisplayValue(props.allTitles[0].title);
			expect(input1).toHaveAttribute('readonly');

			const input2 = getByDisplayValue(props.allTitles[1].title);
			expect(input2).toHaveAttribute('readonly');

			const input3 = getByDisplayValue(props.allTitles[2].title);
			expect(input3).toHaveAttribute('readonly');

			const input4 = getByDisplayValue(props.allTitles[3].title);
			expect(input4).toHaveAttribute('readonly');

			const input5 = getByDisplayValue(props.allTitles[4].title);
			expect(input5).toHaveAttribute('readonly');
		});
	});

	describe('selectFile', () => {
		test('should call selectFile() callback on click', () => {
			const { getByDisplayValue } = render(<FileManager {...props} />);

			const file1 = getByDisplayValue(props.allTitles[1].title);

			fireEvent.click(file1);

			expect(selectFile).toHaveBeenCalledWith(props.allTitles[1].id);

			const file2 = getByDisplayValue(props.allTitles[4].title);

			fireEvent.click(file2);

			expect(selectFile).toHaveBeenCalledWith(props.allTitles[4].id);
		});

		test('should NOT call selectFile() callback on click if already selected', () => {
			const { getByDisplayValue } = render(
				<FileManager {...props} selected={props.allTitles[4].id} />
			);

			const file2 = getByDisplayValue(props.allTitles[4].title);

			fireEvent.click(file2);

			expect(selectFile).toHaveBeenCalledTimes(0);
		});
	});

	describe('enableRename', () => {
		test('should call enableRename() on doubleClick with clicked title id', () => {
			const { getByDisplayValue } = render(<FileManager {...props} />);

			const file1 = getByDisplayValue(props.allTitles[1].title);

			fireEvent.doubleClick(file1);

			expect(enableRename).toHaveBeenCalledWith(props.allTitles[1].id);
		});

		test('should NOT call enableRename() on doubleClick if file is being renamed', () => {
			const { getByDisplayValue } = render(
				<FileManager {...props} renamed={props.allTitles[1].id} />
			);

			const file1 = getByDisplayValue(props.allTitles[1].title);

			fireEvent.doubleClick(file1);

			expect(enableRename).not.toHaveBeenCalled();
		});

		test('should call enableRename() on Rename Action with currently selected title id', () => {
			const { getByText } = render(
				<FileManager {...props} selected={props.allTitles[3].id} />
			);

			const rename = getByText('Rename');

			fireEvent.click(rename);

			expect(enableRename).toHaveBeenCalledWith(props.allTitles[3].id);
		});

		test('input field should reflect changes', () => {
			const { getByDisplayValue } = render(
				<FileManager {...props} renamed={props.allTitles[1].id} />
			);

			const file1 = getByDisplayValue(props.allTitles[1].title);

			act(() => {
				fireEvent.change(file1, { target: { value: 'myNewTitle' } });
			});

			expect(file1.value).toBe('myNewTitle');
		});
	});

	describe('rename', () => {
		test('should not render renamed input file as readonly', () => {
			const { getByDisplayValue } = render(
				<FileManager {...props} renamed={props.allTitles[1].id} />
			);
			const input1 = getByDisplayValue(props.allTitles[0].title);
			expect(input1).toHaveAttribute('readonly');

			const input2 = getByDisplayValue(props.allTitles[1].title);
			expect(input2).not.toHaveAttribute('readonly');

			const input3 = getByDisplayValue(props.allTitles[2].title);
			expect(input3).toHaveAttribute('readonly');

			const input4 = getByDisplayValue(props.allTitles[3].title);
			expect(input4).toHaveAttribute('readonly');

			const input5 = getByDisplayValue(props.allTitles[4].title);
			expect(input5).toHaveAttribute('readonly');
		});

		test('if file is being renamed, should save title on input field blur', () => {
			const { getByDisplayValue } = render(
				<FileManager {...props} renamed={props.allTitles[1].id} />
			);
			const input = getByDisplayValue(props.allTitles[1].title);

			input.value = 'myNewTitle';

			fireEvent.blur(input);

			expect(updateFile).toHaveBeenCalledWith(props.allTitles[1].id, {
				title: 'myNewTitle',
			});
		});

		test('if file is NOT being renamed, should not save title on input field blur', () => {
			const { getByDisplayValue } = render(
				<FileManager
					{...props}
					//renamed={props.allTitles[1].id}
				/>
			);
			const input = getByDisplayValue(props.allTitles[1].title);

			fireEvent.blur(input);

			expect(updateFile).not.toHaveBeenCalled();
		});

		test('if file is being renamed, should save title on enter', () => {
			const { getByDisplayValue } = render(
				<FileManager {...props} renamed={props.allTitles[1].id} />
			);
			const input = getByDisplayValue(props.allTitles[1].title);

			input.value = 'myNewTitle';

			fireEvent.keyPress(input, { charCode: 13, which: 13 });

			expect(updateFile).toHaveBeenCalledWith(props.allTitles[1].id, {
				title: 'myNewTitle',
			});
		});

		test('if file is NOT being renamed, should not save title on enter', () => {
			const { getByDisplayValue } = render(
				<FileManager
					{...props}
					//renamed={props.allTitles[1].id}
				/>
			);
			const input = getByDisplayValue(props.allTitles[1].title);

			fireEvent.keyPress(input, { charCode: 13, which: 13 });

			expect(updateFile).not.toHaveBeenCalled();
		});

		test('should set default title if user tries to save with empty title', () => {
			const { getByDisplayValue } = render(
				<FileManager {...props} renamed={props.allTitles[1].id} />
			);
			const input = getByDisplayValue(props.allTitles[1].title);

			input.value = '';

			fireEvent.keyPress(input, { charCode: 13, which: 13 });

			expect(updateFile).toHaveBeenCalledWith(props.allTitles[1].id, {
				title: props.defaultTitle,
			});
		});
	});

	describe('input focus', () => {
		test('should select input content if file is renamed', () => {
			const { getByDisplayValue } = render(
				<FileManager
					{...props}
					selected={props.allTitles[4].id}
					renamed={props.allTitles[4].id}
				/>
			);

			const file1 = getByDisplayValue(props.allTitles[4].title);

			// we need a mock as jsDom does not support window selection API
			const target = {
				select: jest.fn(),
			};

			fireEvent.focus(file1, { target });

			expect(target.select).toHaveBeenCalledTimes(1);
		});

		test('should NOT select input content if file is not renamed', () => {
			const { getByDisplayValue } = render(
				<FileManager {...props} selected={props.allTitles[4].id} />
			);

			const file1 = getByDisplayValue(props.allTitles[4].title);

			// we need a mock as jsDom does not support window selection API
			const target = {
				select: jest.fn(),
			};

			fireEvent.focus(file1, { target });

			expect(target.select).not.toHaveBeenCalled();
		});
	});

	describe('createFile', () => {
		test('should call createFile() with default title on New Action click', () => {
			const { getByText } = render(<FileManager {...props} />);
			const input = getByText('New');

			fireEvent.click(input);

			expect(createFile).toHaveBeenCalledWith(props.defaultTitle);
		});
	});

	describe('deleteFile', () => {
		test('should call deleteFile() on Delete Action click with selected id', () => {
			const { getByText } = render(
				<FileManager {...props} selected={props.allTitles[2].id} />
			);
			const input = getByText('Delete');

			fireEvent.click(input);

			expect(deleteFile).toHaveBeenCalledWith(props.allTitles[2].id);
		});
	});

	describe('import', () => {
		test('should call startImport() on import action', () => {
			const { getByText } = render(<FileManager {...props} />);
			const importButton = getByText('Import');

			fireEvent.click(importButton);

			expect(startImport).toHaveBeenCalledTimes(1);
		});
	});

	describe('export', () => {
		test('should call setEditorMode() and exportSelectedFileAsText() on export action', () => {
			const { getByText } = render(<FileManager {...props} />);
			const exportButton = getByText('Export');

			fireEvent.click(exportButton);

			expect(setEditorMode).toHaveBeenCalledTimes(1);
			expect(setEditorMode).toHaveBeenCalledWith('export');
			expect(exportSelectedFileAsText).toHaveBeenCalledTimes(1);
		});
	});

	describe('print', () => {
		test('should call setEditorMode() and window.print() on print action', () => {
			const { getByText } = render(<FileManager {...props} />);
			const printButton = getByText('Print');

			fireEvent.click(printButton);

			expect(setEditorMode).toHaveBeenCalledTimes(1);
			expect(setEditorMode).toHaveBeenCalledWith('print');
			expect(window.print).toHaveBeenCalledTimes(1);
		});
	});
});
