import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { getStore } from './state/store';

import ErrorBoundary from './ui/_components/ErrorBoundary';

export default function renderController(Controller) {
	ReactDom.render(
		<Provider store={getStore()}>
			<React.StrictMode>
				<ErrorBoundary>
					<Controller />
				</ErrorBoundary>
			</React.StrictMode>
		</Provider>,
		document.getElementById('app')
	);
}
