import EventEmitter from 'eventemitter2';

export default function pluginFactory(pluginDef) {
	const plugin = new EventEmitter();

	return Object.assign(plugin, pluginDef);
}