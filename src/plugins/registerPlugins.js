import appLayout from './ui/layouts/app/plugin';
import fileManager from './fileManager/plugin';
import songRenderer from './songRenderer/plugin';


export default function registerPlugins(app) {
	app.registerPlugin(appLayout);

	app.registerPlugin(fileManager);
	app.registerPlugin(songRenderer);
}
