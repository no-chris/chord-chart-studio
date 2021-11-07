import clock from '../../../src/core/clock';

describe('clock', () => {
	test('Module', () => {
		expect(typeof clock).toBe('function');
	});

	test('return current time', () => {
		jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
		expect(clock()).toBe(new Date('2020-01-01').getTime());
	});
});
