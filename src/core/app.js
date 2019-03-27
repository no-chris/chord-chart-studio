import _isFunction from 'lodash/isFunction';
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

	return addEventEmitter({
		getAreaBroker() {
			return areaBroker;
		},

		registerPlugin(plugin) {
			plugin.setHost(this);
			pluginRegistry.push(plugin);
		},

		init() {
			return pluginRun.call(this, 'init');
		},

		render() {
			return pluginRun.call(this, 'render');
		}
	});
}
