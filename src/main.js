import '../scss/styles.scss';

import state from './state/state';
import router from './router';

state.createStore();

router.navigateTo('/edit');
