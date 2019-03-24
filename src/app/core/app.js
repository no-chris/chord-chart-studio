import _ from 'lodash';
import EventEmitter from 'eventemitter2';

export default function appFactory(areaBroker) {
	const pluginRegistry = [];

	const app = new EventEmitter();

	async function pluginRun(method) {
		let plugin;

		for (let i = 0; i < pluginRegistry.length; i++) {
			plugin = pluginRegistry[i];

			if (_.isFunction(plugin[method])) {
				await plugin[method]();
			}
		}
		this.emit(method);
	}

	return Object.assign(app, {
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