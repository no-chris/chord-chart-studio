import pluginFactory from '../../../src/core/plugin';

describe('pluginFactory', () => {
	test('Module', () => {
		expect(pluginFactory).toBeInstanceOf(Function);
	});

	describe.each([
		'on',
		'once',
		'off',
		'emit',
		'getHost',
		'setHost',
	])('API: .%s()', (method) => {
		test('Method exists', () => {
			const plugin = pluginFactory();
			expect(plugin[method]).toBeInstanceOf(Function);
		});
	});});

describe('set/getHost()', () => {
	test('should allow to set and retrieve host', () => {
		const host = {};
		const plugin = pluginFactory();
		plugin.setHost(host);

		expect(plugin.getHost()).toBe(host);
	});

	test('should throw if trying to retrieve host before setting it', () => {
		const plugin = pluginFactory();
		const throwingFn = () => plugin.getHost();

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Plugin\'s host has not been setup, cannot retrieve it');
	});

	test('should throw if trying to setup twice the host', () => {
		const plugin = pluginFactory();
		plugin.setHost({});

		const throwingFn = () => plugin.setHost({});

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Cannot override Plugin\'s host');
	});
});
