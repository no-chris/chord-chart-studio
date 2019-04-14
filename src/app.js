import '../scss/styles.scss';

import { createStore } from './state/store';
import router from './router';

export default function run() {
	createStore();

	return router.navigateTo('/editor');
}
