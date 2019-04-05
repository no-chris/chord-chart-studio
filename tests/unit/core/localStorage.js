import store from '../../../src/core/localStorage';

describe('store', () => {
	test('Module', () => {
		expect(store).toBeInstanceOf(Object);
	});

	test('API', () => {
		const methods = [
			'create',
			'getOneByKey',
			'getAllByKeyPrefix',
			'update',
			'delete'
		];
		expect.assertions(methods.length);

		methods.forEach(method => {
			expect(store[method]).toBeInstanceOf(Function);
		});
	});
});

beforeEach(() => {
	localStorage.clear();
	localStorage.setItem.mockClear();
	localStorage.getItem.mockClear();
	localStorage.removeItem.mockClear();
	localStorage.key.mockClear();
});

describe('Create', () => {
	test('Should create an entry in localstorage with serialized object', () => {
		const myValue = {
			key: 'myKey',
			title: 'myTitle',
			content: 'myContent'
		};
		store.create('myKey', myValue);

		expect(localStorage.setItem).toHaveBeenCalledWith('myKey', '{"key":"myKey","title":"myTitle","content":"myContent"}');
		expect(localStorage.__STORE__['myKey']).toBe('{"key":"myKey","title":"myTitle","content":"myContent"}');
		expect(localStorage.__STORE__.length).toBe(1);
	});

	test('Should throw if given empty key', () => {
		const throwingFn = () => store.create('', {});

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Cannot create localstorage entry with empty key');

		expect(localStorage.setItem).not.toHaveBeenCalled();
		expect(localStorage.__STORE__.length).toBe(0);
	});

	test('Should throw if key already exists', () => {
		const myValue = {
			key: 'myKey',
			title: 'myTitle',
			content: 'myContent'
		};
		const throwingFn = () => store.create('myKey', myValue);

		throwingFn();

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Already exists key: myKey');

		expect(localStorage.setItem).toHaveBeenCalledWith('myKey', JSON.stringify(myValue));
		expect(localStorage.__STORE__['myKey']).toBe(JSON.stringify(myValue));
		expect(localStorage.__STORE__.length).toBe(1);
	});
});

describe('Read', () => {
	test('Should read a single entry', () => {
		const myValue = {
			key: 'myKey',
			title: 'myTitle',
			content: 'myContent'
		};
		store.create('myKey', myValue);

		const myRetrivedValue = store.getOneByKey('myKey');
		expect(myRetrivedValue).toEqual(myValue);
	});

	test('Should return null if key does not exists', () => {
		const myValue = store.getOneByKey('myKey');
		expect(myValue).toBeNull();
	});

	test('Should read multiple entries by prefix', () => {
		store.create('prefix1_AAA', { key: 'prefix1_AAA', title: 'myTitle1_AAA', content: 'myContent1_AAA' });
		store.create('prefix1_BBB', { key: 'prefix1_BBB', title: 'myTitle1_BBB', content: 'myContent1_BBB' });
		store.create('prefix1_CCC', { key: 'prefix1_CCC', title: 'myTitle1_CCC', content: 'myContent1_CCC' });

		store.create('prefix2_AAA', { key: 'prefix2_AAA', title: 'myTitle2_AAA', content: 'myContent2_AAA' });
		store.create('prefix2_BBB', { key: 'prefix2_BBB', title: 'myTitle2_BBB', content: 'myContent2_BBB' });
		store.create('prefix2_CCC', { key: 'prefix2_CCC', title: 'myTitle2_CCC', content: 'myContent2_CCC' });

		let allEntries = store.getAllByKeyPrefix('prefix1');
		expect(allEntries.prefix1_AAA).toEqual({ key: 'prefix1_AAA', title: 'myTitle1_AAA', content: 'myContent1_AAA' });
		expect(allEntries.prefix1_BBB).toEqual({ key: 'prefix1_BBB', title: 'myTitle1_BBB', content: 'myContent1_BBB' });
		expect(allEntries.prefix1_CCC).toEqual({ key: 'prefix1_CCC', title: 'myTitle1_CCC', content: 'myContent1_CCC' });
		expect(allEntries.prefix2_AAA).toBeUndefined();
		expect(allEntries.prefix2_BBB).toBeUndefined();
		expect(allEntries.prefix2_CCC).toBeUndefined();

		allEntries = store.getAllByKeyPrefix('prefix2');
		expect(allEntries.prefix1_AAA).toBeUndefined();
		expect(allEntries.prefix1_BBB).toBeUndefined();
		expect(allEntries.prefix1_CCC).toBeUndefined();
		expect(allEntries.prefix2_AAA).toEqual({ key: 'prefix2_AAA', title: 'myTitle2_AAA', content: 'myContent2_AAA' });
		expect(allEntries.prefix2_BBB).toEqual({ key: 'prefix2_BBB', title: 'myTitle2_BBB', content: 'myContent2_BBB' });
		expect(allEntries.prefix2_CCC).toEqual({ key: 'prefix2_CCC', title: 'myTitle2_CCC', content: 'myContent2_CCC' });
	});

	test('Should return empty object if no key with prefix is found', () => {
		store.create('prefix1_AAA', {});
		store.create('prefix1_BBB', {});
		store.create('prefix1_CCC', {});

		store.create('prefix2_AAA', {});
		store.create('prefix2_BBB', {});
		store.create('prefix2_CCC', {});

		const allEntries = store.getAllByKeyPrefix('prefix3');
		expect(allEntries).toEqual({});
	});
});


describe('Update', () => {
	test('Should update an entry in localstorage', () => {
		const myValue = {
			key: 'myKey',
			title: 'myTitle',
			content: 'myContent'
		};
		const myNewValue = {
			key: 'myNewKey',
			title: 'myNewTitle',
			content: 'myNewContent'
		};
		store.create('myKey', myValue);
		store.update('myKey', myNewValue);

		expect(localStorage.setItem).toHaveBeenCalledTimes(2);
		expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'myKey', JSON.stringify(myValue));
		expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'myKey', JSON.stringify(myNewValue));
		expect(localStorage.__STORE__['myKey']).toBe(JSON.stringify(myNewValue));
		expect(localStorage.__STORE__.length).toBe(1);
	});

	test('Should throw if given non existent key', () => {
		const throwingFn = () => store.update('myKey', {});

		expect(localStorage.__STORE__.length).toBe(0);

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Cannot find and update key: myKey');

		expect(localStorage.setItem).not.toHaveBeenCalled();
		expect(localStorage.__STORE__.length).toBe(0);
	});
});


describe('Delete', () => {
	test('Should remove an entry in localstorage', () => {
		const myValue = {
			key: 'myKey',
			title: 'myTitle',
			content: 'myContent'
		};
		store.create('myKey', myValue);

		expect(localStorage.__STORE__['myKey']).toBe(JSON.stringify(myValue));
		expect(localStorage.__STORE__.length).toBe(1);

		store.delete('myKey');

		expect(localStorage.removeItem).toHaveBeenCalledWith('myKey');
		expect(localStorage.__STORE__['myKey']).toBeUndefined();
		expect(localStorage.__STORE__.length).toBe(0);
	});

	test('Should not throw if given non existent key', () => {
		store.create('myKey', {});

		store.delete('myOtherKey');

		expect(localStorage.__STORE__.length).toBe(1);
		expect(localStorage.removeItem).toHaveBeenCalledWith('myOtherKey');
	});
});
