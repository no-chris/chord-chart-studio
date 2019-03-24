import header from './plugins/content/header/plugin';
import footer from './plugins/content/footer/plugin';
import editor from './plugins/editor/plugin';
import fileExplorer from './plugins/fileExplorer/plugin';
import renderingOptions from './plugins/renderingOptions/plugin';

export default function registerPlugins(app) {
	app.registerPlugin(header);
	app.registerPlugin(footer);
	app.registerPlugin(editor);
	app.registerPlugin(fileExplorer);
	app.registerPlugin(renderingOptions);
}