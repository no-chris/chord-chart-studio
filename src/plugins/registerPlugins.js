import header from './content/header/plugin';
import footer from './content/footer/plugin';
import editor from './editor/plugin';
import fileExplorer from './fileExplorer/plugin';
import renderingOptions from './renderingOptions/plugin';

export default function registerPlugins(app) {
	app.registerPlugin(header);
	app.registerPlugin(footer);
	app.registerPlugin(editor);
	app.registerPlugin(fileExplorer);
	app.registerPlugin(renderingOptions);
}
