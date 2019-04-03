import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import state from './state';

import app from './app';

export default function renderController(Controller) {
	ReactDom.render(
		<Provider store={state.getStore()}>
			<Controller app={app} />
		</Provider>,
		document.getElementById('app')
	);
}
