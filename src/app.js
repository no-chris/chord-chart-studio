import '../scss/styles.scss';

import { createStore } from './state/store';
import registerHandlers from './registerHandlers';
import router from './router';

registerHandlers();

export default function run() {
	createStore();

	return router.navigateTo('/editor');
}
