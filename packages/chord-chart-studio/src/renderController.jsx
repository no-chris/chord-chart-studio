import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { getStore } from './state/store';

import ErrorBoundary from './ui/_components/ErrorBoundary';

let root;

export default function renderController(Controller, params) {
	const container = document.getElementById('app');
	if (!root) {
		root = createRoot(container);
	}

	root.render(
		<Provider store={getStore()}>
			<React.StrictMode>
				<ErrorBoundary>
					<Controller {...params} />
				</ErrorBoundary>
			</React.StrictMode>
		</Provider>
	);
}
