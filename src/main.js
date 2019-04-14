import '../scss/styles.scss';

import { createStore } from './state/store';
import router from './router';

createStore();

router.navigateTo('/editor');
