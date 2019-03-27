import htmlToElement from './core/dom/htmlToElement';

import areaBrokerFactory from './core/areaBroker';
import appFactory from './core/app';
import registerPlugins from './plugins/registerPlugins';

import appTpl from './app.hbs';


document.body.appendChild(
	htmlToElement(appTpl())
);

const areas = {
	header: '[data-area="app-header"]',
	footer: '[data-area="app-footer"]',
	sideBar: '[data-area="app-side-bar"]',
	content: '[data-area="app-content"]',
};

const areaBroker = areaBrokerFactory(areas);
const app = appFactory(areaBroker);

registerPlugins(app);

export default app;
