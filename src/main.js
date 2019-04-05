import '../scss/styles.scss';

import state from './state';
import router from './router';
import reducers from './reducers';

state.createStore(reducers, {});

router.navigateTo('/edit');
