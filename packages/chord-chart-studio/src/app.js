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

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('./sw.js')
		.then((reg) => console.log('SW registered!', reg))
		.catch((err) => console.log('Boo!', err));
}

// changes => sales
//
//
//
