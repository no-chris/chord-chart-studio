import store from '../../../../src/app/core/store';

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
	test('Should create an entry in localstorage', () => {
		store.create('myKey', 'myValue');

		expect(localStorage.setItem).toHaveBeenCalledWith('myKey', 'myValue');
		expect(localStorage.__STORE__['myKey']).toBe('myValue');
		expect(localStorage.__STORE__.length).toBe(1);
	});

	test('Should throw if given empty key', () => {
		const throwingFn = () => store.create('', 'myValue');

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Cannot create localstorage entry with empty key');

		expect(localStorage.setItem).not.toHaveBeenCalled();
		expect(localStorage.__STORE__.length).toBe(0);
	});

	test('Should throw if key already exists', () => {
		const throwingFn = () => store.create('myKey', 'myValue');

		throwingFn();

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Already exists key: myKey');

		expect(localStorage.setItem).toHaveBeenCalledWith('myKey', 'myValue');
		expect(localStorage.__STORE__['myKey']).toBe('myValue');
		expect(localStorage.__STORE__.length).toBe(1);
	});
});

describe('Read', () => {
	test('Should read a single entry', () => {
		store.create('myKey', 'myValue');

		const myValue = store.getOneByKey('myKey');
		expect(myValue).toBe('myValue');
	});

	test('Should return null if key does not exists', () => {
		const myValue = store.getOneByKey('myKey');
		expect(myValue).toBeNull();
	});

	test('Should read multiple entries by prefix', () => {
		store.create('prefix1_AAA', 'myValue1_AAA');
		store.create('prefix1_BBB', 'myValue1_BBB');
		store.create('prefix1_CCC', 'myValue1_CCC');

		store.create('prefix2_AAA', 'myValue2_AAA');
		store.create('prefix2_BBB', 'myValue2_BBB');
		store.create('prefix2_CCC', 'myValue2_CCC');

		const allEntries = store.getAllByKeyPrefix('prefix1');
		expect(allEntries.prefix1_AAA).toBe('myValue1_AAA');
		expect(allEntries.prefix1_BBB).toBe('myValue1_BBB');
		expect(allEntries.prefix1_CCC).toBe('myValue1_CCC');
		expect(allEntries.prefix2_AAA).toBeUndefined();
		expect(allEntries.prefix2_BBB).toBeUndefined();
		expect(allEntries.prefix2_CCC).toBeUndefined();
	});

	test('Should return empty object if no key with prefix is found', () => {
		store.create('prefix1_AAA', 'myValue1_AAA');
		store.create('prefix1_BBB', 'myValue1_BBB');
		store.create('prefix1_CCC', 'myValue1_CCC');

		store.create('prefix2_AAA', 'myValue2_AAA');
		store.create('prefix2_BBB', 'myValue2_BBB');
		store.create('prefix2_CCC', 'myValue2_CCC');

		const allEntries = store.getAllByKeyPrefix('prefix3');
		expect(allEntries).toEqual({});
	});
});


describe('Update', () => {
	test('Should update an entry in localstorage', () => {
		store.create('myKey', 'myValue');
		store.update('myKey', 'myNewValue');

		expect(localStorage.setItem).toHaveBeenCalledTimes(2);
		expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'myKey', 'myValue');
		expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'myKey', 'myNewValue');
		expect(localStorage.__STORE__['myKey']).toBe('myNewValue');
		expect(localStorage.__STORE__.length).toBe(1);
	});

	test('Should throw if given non existent key', () => {
		const throwingFn = () => store.update('myKey', 'myValue');

		expect(localStorage.__STORE__.length).toBe(0);

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Cannot find and update key: myKey');

		expect(localStorage.setItem).not.toHaveBeenCalled();
		expect(localStorage.__STORE__.length).toBe(0);
	});
});


describe('Delete', () => {
	test('Should remove an entry in localstorage', () => {
		store.create('myKey', 'myValue');

		expect(localStorage.__STORE__['myKey']).toBe('myValue');
		expect(localStorage.__STORE__.length).toBe(1);

		store.delete('myKey');

		expect(localStorage.removeItem).toHaveBeenCalledWith('myKey');
		expect(localStorage.__STORE__['myKey']).toBeUndefined();
		expect(localStorage.__STORE__.length).toBe(0);
	});

	test('Should not throw if given non existent key', () => {
		store.create('myKey', 'myValue');

		store.delete('myOtherKey');

		expect(localStorage.__STORE__.length).toBe(1);
		expect(localStorage.removeItem).toHaveBeenCalledWith('myOtherKey');
	});
});