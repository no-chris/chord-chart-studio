import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { getStore } from './state/store';

export default function renderController(Controller) {
	ReactDom.render(
		<Provider store={getStore()}>
			<Controller />
		</Provider>,
		document.getElementById('app')
	);
}
