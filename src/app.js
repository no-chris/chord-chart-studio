import '../scss/styles.scss';

import { createStore } from './state/store';
import registerHandlers from './registerHandlers';
import router from './router';
import addSampleContent from './addSampleContent';

registerHandlers();

export default function run() {
	createStore();

	addSampleContent();

	return router.navigateTo('/editor');
}
