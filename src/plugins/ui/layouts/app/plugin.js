import pluginFactory from '../../../../core/pluginFactory';
import { initialState, reducers } from './state';

const pluginId = 'ui_app_layout';

const headerPlugin = pluginFactory(pluginId, {
	getInitialState() {
		return initialState; // needed ?
	},

	getReducers() {
		return reducers;
	},
});

export default headerPlugin;
