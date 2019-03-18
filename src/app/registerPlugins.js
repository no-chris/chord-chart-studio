import header from './plugins/content/header/plugin';
import footer from './plugins/content/footer/plugin';
import editor from './plugins/editor/plugin';

export default function registerPlugins(app) {
	app.registerPlugin(header);
	app.registerPlugin(footer);
	app.registerPlugin(editor);
}