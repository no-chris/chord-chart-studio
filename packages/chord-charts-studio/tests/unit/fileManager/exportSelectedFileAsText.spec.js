jest.mock('file-saver');
jest.mock('uuid');

import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

import { resetStore, dispatch } from '../../integration/helpers/withStore';

import { createFile } from '../../../src/db/files/actions';
import { selectFile } from '../../../src/fileManager/_state/actions';
import { setOptionValue } from '../../../src/db/options/actions';

import exportSelectedFileAsText from '../../../src/fileManager/exportSelectedFileAsText';

beforeEach(() => {
	resetStore();
	saveAs.mockClear();
	uuidv4.mockReturnValue('myUUID');
});

describe('exportSelectedFileAsText', () => {
	test('Module', () => {
		expect(typeof exportSelectedFileAsText).toBe('function');
	});

	test('should call saveAs() with a chordMarkFile and a .txt extension', async () => {
		dispatch(createFile('aSong - anArtist', 'A\n_mySong\n'));
		dispatch(selectFile('myUUID'));
		dispatch(setOptionValue('songFormatting', 'chartFormat', 'chordmark'));

		exportSelectedFileAsText();

		expect(saveAs).toHaveBeenCalledTimes(1);

		const blob = saveAs.mock.calls[0][0];
		const filename = saveAs.mock.calls[0][1];

		expect(filename).toBe('aSong - anArtist.txt');

		const fileContent = await blobToTxt(blob);
		expect(fileContent).toBe('|A    |\nmySong\n');
	});

	test('should call saveAs() with a chordMark (source) file and a .txt extension', async () => {
		dispatch(createFile('aSong - anArtist', 'A\n_mySong\n'));
		dispatch(selectFile('myUUID'));
		dispatch(
			setOptionValue('songFormatting', 'chartFormat', 'chordmarkSrc')
		);

		exportSelectedFileAsText();

		expect(saveAs).toHaveBeenCalledTimes(1);

		const blob = saveAs.mock.calls[0][0];
		const filename = saveAs.mock.calls[0][1];

		expect(filename).toBe('aSong - anArtist.txt');

		const fileContent = await blobToTxt(blob);
		expect(fileContent).toBe('A\n_mySong\n');
	});

	test('should call saveAs() with a chordPro file and a .cho extension', async () => {
		dispatch(createFile('aSong - anArtist', 'A\n_mySong\n'));
		dispatch(selectFile('myUUID'));
		dispatch(setOptionValue('songFormatting', 'chartFormat', 'chordpro'));

		exportSelectedFileAsText();

		expect(saveAs).toHaveBeenCalledTimes(1);

		const blob = saveAs.mock.calls[0][0];
		const filename = saveAs.mock.calls[0][1];

		expect(filename).toBe('aSong - anArtist.cho');

		const fileContent = await blobToTxt(blob);
		expect(fileContent).toBe('[A]mySong\n');
	});
});

const blobToTxt = (blob) =>
	new Promise((resolve) => {
		const reader = new FileReader();

		reader.addEventListener('loadend', () => {
			resolve(reader.result);
		});
		reader.readAsText(blob);
	});
