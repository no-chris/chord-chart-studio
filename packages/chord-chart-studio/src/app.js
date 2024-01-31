import '../scss/styles.scss';

import { createStore } from './state/store';
import registerHandlers from './registerHandlers';
import registerSW from './registerSW';
import router from './router';
import addSampleContent from './addSampleContent';

registerHandlers();
registerSW();

export default function run() {
	createStore();

	addSampleContent();

	return router.navigateTo('/editor');
}
