import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { getStore } from './state/store';

import ErrorBoundary from './ui/_components/ErrorBoundary';

const container = document.getElementById('app');
const root = createRoot(container);

export default function renderController(Controller, params) {
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
