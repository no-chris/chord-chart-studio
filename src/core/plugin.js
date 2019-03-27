import addEventEmitter from './addEventEmitter';

export default function pluginFactory(pluginDef) {
	let host;

	return Object.assign(pluginDef, addEventEmitter({
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
	}));
}
