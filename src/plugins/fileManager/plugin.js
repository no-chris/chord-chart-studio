import pluginFactory from '../../core/pluginFactory';
import pluginId from './id';
import fileManagerFactory from '../../core/fileManager';

import { reducers } from './state';

const plugin = pluginFactory(pluginId, {
	init() {
		const app = this.getHost();
		const fm = fileManagerFactory();

		app.on('editorchange', newSongTxt => {
			//fm.update
		});

	},

	getReducers() {
		return reducers;
	},

	destroy() {

	}
});

export default plugin;
