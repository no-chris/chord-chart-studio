import _ from 'lodash';

import appFactory from '../../../src/core/app';
import pluginFactory from '../../../src/core/pluginFactory';

describe('appFactory', () => {
	test('Module', () => {
		expect(appFactory).toBeInstanceOf(Function);
	});

	test('API', () => {
		const app = appFactory();
		const api = [
			'on',
			'once',
			'off',
			'emit',

			'registerPlugin',
			'init',
			'render',
		];
		expect.assertions(api.length);

		api.forEach(method => {
			expect(app[method]).toBeInstanceOf(Function);
		});
	});

	test('Factory should return a different object on each call', () => {
		const app1 = appFactory();
		const app2 = appFactory();
		expect(app1).not.toBe(app2);
	});
});


describe('Plugin host', () => {
	test('Should set application itself as plugin host', () => {
		expect.assertions(1);

		const app = appFactory();

		const plugin = pluginFactory({
			init() {
				const host = this.getHost();
				expect(host).toBe(app);
			}
		});

		app.registerPlugin(plugin);

		return app.init();
	});
});


describe('Plugins lifecycle', () => {
	test('Run plugins init() in sequence', () => {
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
		});

		const init = app.init();

		expect(init).toBeInstanceOf(Promise);

		return init;
	});

	test('Run plugins render() in sequence', () => {
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
		});

		const render = app.render();

		expect(render).toBeInstanceOf(Promise);

		return render;
	});

});
