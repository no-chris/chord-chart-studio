import header from './plugins/content/header/plugin';
import footer from './plugins/content/footer/plugin';

export default function registerPlugins(app) {
	app.registerPlugin(header);
	app.registerPlugin(footer);
}