import pluginFactory from '../../core/pluginFactory';
import pluginId from './id';

import { reducers } from './state';

const plugin = pluginFactory(pluginId, {
	getReducers() {
		return reducers;
	},
});

export default plugin;
