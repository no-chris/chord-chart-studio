import '../scss/styles.scss';

import app from './app';
import router from './router';

app.init()
	.then(() => {
		router.navigateTo('/edit');
	});
