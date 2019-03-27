import pluginFactory from '../../../src/core/plugin';
import isEventEmitter from './isEventEmitter';

describe('pluginFactory', () => {
	test('Module', () => {
		expect(pluginFactory).toBeInstanceOf(Function);
	});

	test('Event emitter', () => {
		const plugin = pluginFactory();
		isEventEmitter(expect, plugin);
	});
});

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
