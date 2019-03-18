import '../../scss/styles.scss';

import areaBrokerFactory from './core/areaBroker';
import appFactory from './core/app';
import registerPlugins from './registerPlugins';

const areas = {
	header: '[data-area="app-header"]',
	footer: '[data-area="app-footer"]',
	sideBar: '[data-area="app-side-bar"]',
	content: '[data-area="app-content"]',
};

const areaBroker = areaBrokerFactory(areas);
const app = appFactory(areaBroker);

registerPlugins(app);

app.init()
	.then(() => {
		return app.render();
	});



/**
const alignRenderingSwitch = document.querySelector('#aligned-rendering');

alignRenderingSwitch.addEventListener('change', () => {
	editor.load(editorNode);
});
**/
