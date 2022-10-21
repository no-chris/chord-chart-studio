import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { getStore } from './state/store';

import ErrorBoundary from './ui/_components/ErrorBoundary';

export default function renderController(Controller) {
	const container = document.getElementById('app');
	const root = createRoot(container);

	root.render(
		<Provider store={getStore()}>
			<React.StrictMode>
				<ErrorBoundary>
					<Controller />
				</ErrorBoundary>
			</React.StrictMode>
		</Provider>
	);
}
