import EventEmitter from 'eventemitter2';

export default function pluginFactory(pluginDef) {
	const plugin = new EventEmitter();

	let host;

	return Object.assign(plugin, pluginDef, {
		getHost() {
			if (!host) {
				throw new Error('Plugin\'s host has not been setup, cannot retrieve it');
			}
			return host;
		},

		setHost(newHost) {
			if (host) {
				throw new Error('Cannot override Plugin\'s host');
			}
			host = newHost;
		}
	});
}