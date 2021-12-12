import getUploadedFile from '../../../src/songImporter/getUploadedFile';

describe('getUploadedFile', () => {
	test('Module', () => {
		expect(typeof getUploadedFile).toBe('function');
	});

	const text = jest.fn();
	const fileList = [];

	beforeEach(() => {
		text.mockClear();
		fileList.length = 0;
		fileList.push({
			size: 20 * 1024,
			name: 'My.File.With.A.LongTitle.chopro',
			type: 'text',
			text,
		});
	});

	test('Should reject a Promise if called with an empty file list', () => {
		return getUploadedFile([]).catch((e) =>
			expect(e).toBe('No file selected.')
		);
	});

	test('Should reject a Promise if called with a file too big', () => {
		fileList[0].size = 51 * 1024;

		return getUploadedFile(fileList).catch((e) =>
			expect(e).toBe(
				'The selected file is too big: 52 kB (maximum allowed file size is 51 kB).'
			)
		);
	});

	test('Should reject a Promise if called with a file that is not a text', () => {
		fileList[0].type = 'image';

		return getUploadedFile(fileList).catch((e) =>
			expect(e).toBe('Cannot import file of type image.')
		);
	});

	test('Should reject a Promise if cannot convert the content as text', () => {
		fileList[0].text.mockRejectedValue('duh!');

		return getUploadedFile(fileList).catch((e) => expect(e).toBe('duh!'));
	});

	test('Should return an object with the file content and the file name without the extension', () => {
		fileList[0].text.mockResolvedValue('myContent');

		const expected = {
			content: 'myContent',
			title: 'My.File.With.A.LongTitle',
		};

		return getUploadedFile(fileList).then((file) =>
			expect(file).toEqual(expected)
		);
	});
});
