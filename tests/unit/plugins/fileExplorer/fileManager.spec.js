jest.mock('../../../../src/core/store');

import fileManagerFactory from '../../../../src/plugins/fileManager/services/fileManager';
import storeMock from '../../../../src/core/store';

import nanoid from 'nanoid';

describe('fileManagerFactory', () => {
	test('Module', () => {
		expect(fileManagerFactory).toBeInstanceOf(Function);
	});
});


beforeEach(() => {
	storeMock.create.mockClear();
	storeMock.getAllByKeyPrefix.mockClear();
	storeMock.getOneByKey.mockClear();
	storeMock.update.mockClear();
	storeMock.delete.mockClear();
});

describe('Create', () => {
	test('should return and persist a new file', () => {
		nanoid.mockReturnValue('A1B2C3');

		const fm = fileManagerFactory();
		const newFile = fm.create();

		expect(storeMock.create).toHaveBeenCalledTimes(1);
		expect(storeMock.create).toHaveBeenCalledWith(newFile.key, newFile);

		expect(newFile.key).toBe('song:A1B2C3');
		expect(newFile.title).toBe('untitled');
		expect(newFile.content).toBe('');
	});
});

describe('Read', () => {
	test('should return all created files', () => {
		const fm = fileManagerFactory();
		const allFilesExpected = {
			'song:key1': { key: 'song:key1' },
			'song:key2': { key: 'song:key2' },
			'song:key3': { key: 'song:key3' },
		};

		storeMock.getAllByKeyPrefix.mockReturnValue(allFilesExpected);

		const allFiles = fm.getAll();

		expect(storeMock.getAllByKeyPrefix).toHaveBeenCalledTimes(1);
		expect(storeMock.getAllByKeyPrefix).toHaveBeenCalledWith('song:');
		expect(allFiles).toEqual(allFilesExpected);
	});

	test('should return one file', () => {
		const fm = fileManagerFactory();
		const fileExpected = { key: 'song:key1' };

		storeMock.getOneByKey.mockReturnValue(fileExpected);

		const file = fm.getOneByKey('song:key1');

		expect(storeMock.getOneByKey).toHaveBeenCalledTimes(1);
		expect(storeMock.getOneByKey).toHaveBeenCalledWith('song:key1');
		expect(file).toEqual(fileExpected);
	});
});

describe('Update', () => {
	test('should update file title', () => {
		const fm = fileManagerFactory();
		const file = {
			key: 'song:key1',
			title: 'first title',
			content: 'content'
		};

		storeMock.getOneByKey.mockReturnValue(file);

		fm.updateTitle('song:key1', 'this is a new title');

		file.title = 'this is a new title';

		expect(storeMock.update).toHaveBeenCalledTimes(1);
		expect(storeMock.update).toHaveBeenCalledWith('song:key1', file);
	});

	test('should update file title', () => {
		const fm = fileManagerFactory();
		const file = {
			key: 'song:key1',
			title: 'title',
			content: 'first content'
		};

		storeMock.getOneByKey.mockReturnValue(file);

		fm.updateContent('song:key1', 'this is a new content');

		file.title = 'this is a new content';

		expect(storeMock.update).toHaveBeenCalledTimes(1);
		expect(storeMock.update).toHaveBeenCalledWith('song:key1', file);
	});
});

describe('Delete', () => {
	test('should delete file from persistence', () => {
		const fm = fileManagerFactory();
		fm.deleteOne('song:key1');

		expect(storeMock.delete).toHaveBeenCalledTimes(1);
		expect(storeMock.delete).toHaveBeenCalledWith('song:key1');
	});
});

