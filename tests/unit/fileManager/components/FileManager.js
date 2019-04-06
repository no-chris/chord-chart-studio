import FileManager from '../../../../src/fileManager/components/FileManager';

describe('FileManager', () => {
	test('Module', () => {
		expect(FileManager).toBeInstanceOf(Function);
	});
});

describe('FileManager', () => {
	test('Module', () => {
		expect(FileManager).toBeInstanceOf(Function);
	});
});

describe.each([
	['title', 'input', 'output'],
])('Group title for %s', (title, input, output) => {
	test('Test details', () => {
		expect(input).toEqual(output);
	});
});
