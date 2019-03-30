import _isFunction from 'lodash/isFunction';

import state from './state';

import addEventEmitter from './addEventEmitter';

export default function appFactory(areaBroker) {
	const pluginRegistry = [];

	async function pluginRun(method) {
		let plugin;

		for (let i = 0; i < pluginRegistry.length; i++) {
			plugin = pluginRegistry[i];

			if (_isFunction(plugin[method])) {
				await plugin[method]();
			}
		}
		this.emit(method);
	}

	function pluginGet(method) {
		const allResults = {};

		pluginRegistry.forEach(plugin => {
			if (_isFunction(plugin[method])) {
				allResults[plugin.id] = plugin[method]();
			}
		});
		return allResults;
	}

	return addEventEmitter({
		getAreaBroker() {
			return areaBroker;
		},

		registerPlugin(plugin) {
			plugin.setHost(this);
			pluginRegistry.push(plugin);
		},

		setInitialState() {
			const initialState = pluginGet('getInitialState');
			const allReducters = pluginGet('getReducers');

			state.createStore(allReducters, initialState);

		},

		init() {
			this.setInitialState();

			return pluginRun.call(this, 'init');
		},

		render() {
			return pluginRun.call(this, 'render');
		}
	});
}
