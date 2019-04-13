import '../scss/styles.scss';

import store from './state/store';
import router from './router';

store.create();

router.navigateTo('/editor');
