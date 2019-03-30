import appLayout from './ui/layouts/app/plugin';
import fileManager from './fileManager/plugin';

// Registration order matters!

export default function registerPlugins(app) {
	app.registerPlugin(appLayout);

	app.registerPlugin(fileManager);
}
