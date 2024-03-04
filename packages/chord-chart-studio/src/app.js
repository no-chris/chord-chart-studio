import '../css/global.css';
import '../scss/styles.scss';

import { createStore } from './state/store';
import registerHandlers from './registerHandlers';
import addSampleContent from './addSampleContent';
import router, { navigateTo } from './core/router';
import allRoutes from './modules/allRoutes';

registerHandlers();

export default function run() {
	createStore();

	addSampleContent();

	const currentPathname = window
		? window.location.pathname + window.location.search
		: '/';

	router.init(allRoutes);

	return navigateTo(currentPathname);
}
