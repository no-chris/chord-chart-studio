import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import state from './core/state';

export default function renderController(Controller) {
	ReactDom.render(
		<Provider store={state.getStore()}>
			<Controller />
		</Provider>,
		document.getElementById('app')
	);
}
