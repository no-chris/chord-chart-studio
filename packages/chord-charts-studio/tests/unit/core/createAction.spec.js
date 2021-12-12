import createAction from '../../../src/core/createAction';

describe('createAction', () => {
	test('Module', () => {
		expect(createAction).toBeInstanceOf(Function);
	});
});

describe('createAction()', () => {
	test('Should return an valid action', () => {
		const type = 'ACTION_TYPE';
		const payload = { foo1: 'bar', foo2: 'baz' };

		const action = createAction(type, payload);

		expect(action).toBeInstanceOf(Object);
		expect(action.type).toBe(type);
		expect(action.payload).toBe(payload);
	});

	test('Should throw if no type is given', () => {
		const payload = { foo1: 'bar', foo2: 'baz' };

		const throwingFn = () => createAction(null, payload);

		expect(throwingFn).toThrow(TypeError);
		expect(throwingFn).toThrow(
			'Cannot create an action without an action type'
		);
	});
});
