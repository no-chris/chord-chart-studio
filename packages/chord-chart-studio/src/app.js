import '../scss/styles.scss';

import { createStore } from './state/store';
import registerHandlers from './registerHandlers';
import registerSW from './registerSW';
import addSampleContent from './addSampleContent';
import router, { navigateTo } from './core/router';
import allRoutes from './modules/allRoutes';

registerHandlers();
registerSW();

export default function run() {
	createStore();

	addSampleContent();

	const currentPathname = window ? window.location.pathname : '/';

	router.initRouter(allRoutes);

	return navigateTo(currentPathname);
}
