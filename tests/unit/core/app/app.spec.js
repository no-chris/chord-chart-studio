import _ from 'lodash';

import appFactory from '../../../../src/core/app/app';
import pluginFactory from '../../../../src/core/app/plugin';

import isEventEmitter from '../isEventEmitter';

describe('appFactory', () => {
	test('Module', () => {
		expect(appFactory).toBeInstanceOf(Function);
	});

	test('API', () => {
		const app = appFactory();
		const api = [
			'registerPlugin',
			'getAreaBroker',
			'init'
		];
		expect.assertions(api.length);

		api.forEach(method => {
			expect(app[method]).toBeInstanceOf(Function);
		});
	});

	test('Event emitter', () => {
		const app = appFactory();
		isEventEmitter(expect, app);
	});
});

describe('AreaBroker', () => {
	test('return given areaBroker on app creation', () => {
		const areaBroker = {};
		const app = appFactory(areaBroker);
		expect(app.getAreaBroker()).toEqual(areaBroker);
	});
});


describe('Plugins lifecycle', () => {
	test('Run plugins init() in sequence', done => {
		expect.assertions(4);

		let spy = 0;

		const app = appFactory();
		const pluginWithAsyncInit = pluginFactory({
			init() {
				return new Promise(resolve => {
					_.delay(() => {
						expect(spy).toEqual(0);
						spy++;

						resolve();
					}, 5);
				});
			}
		});
		const pluginWithSyncInit = pluginFactory({
			init() {
				expect(spy).toEqual(1);
				spy++;
			}
		});

		app.registerPlugin(pluginWithAsyncInit);
		app.registerPlugin(pluginWithSyncInit);

		app.on('init', () => {
			expect(spy).toEqual(2);
			done();
		});

		const init = app.init();

		expect(init).toBeInstanceOf(Promise);
	});

	test('Run plugins render() in sequence', done => {
		expect.assertions(4);

		let spy = 0;

		const app = appFactory();
		const pluginWithAsyncRender = pluginFactory({
			render() {
				return new Promise(resolve => {
					_.delay(() => {
						expect(spy).toEqual(0);
						spy++;

						resolve();
					}, 5);
				});
			}
		});
		const pluginWithSyncRender = pluginFactory({
			render() {
				expect(spy).toEqual(1);
				spy++;
			}
		});

		app.registerPlugin(pluginWithAsyncRender);
		app.registerPlugin(pluginWithSyncRender);

		app.on('render', () => {
			expect(spy).toEqual(2);
			done();
		});

		const render = app.render();

		expect(render).toBeInstanceOf(Promise);
	});

});
