import pluginFactory from '../../../../src/core/app/plugin';
import isEventEmitter from '../isEventEmitter';

describe('pluginFactory', () => {
	test('Module', () => {
		expect(pluginFactory).toBeInstanceOf(Function);
	});

	test('Event emitter', () => {
		const plugin = pluginFactory();
		isEventEmitter(expect, plugin);
	});
});
