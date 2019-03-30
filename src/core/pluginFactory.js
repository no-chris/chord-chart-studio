import addEventEmitter from './addEventEmitter';
import _assign from 'lodash/assign';

export default function pluginFactory(id, pluginDef = {}) {
	let host;

	const pluginBase = addEventEmitter({
		id,

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

	_assign(pluginDef, pluginBase);

	return pluginDef;
}
