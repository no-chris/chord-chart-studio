import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import store from './state/store';

export default function renderController(Controller) {
	ReactDom.render(
		<Provider store={store.get()}>
			<Controller />
		</Provider>,
		document.getElementById('app')
	);
}
