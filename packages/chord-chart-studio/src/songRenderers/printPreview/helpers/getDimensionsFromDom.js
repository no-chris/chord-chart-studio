import './getDimensionsFromDom.scss';

import React, { useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';

export default function getDimensionsFromDom(component, measuringFn) {
	const container = document.createElement('div');
	container.classList.add('measuring-node');
	document.body.appendChild(container);
	const root = createRoot(container);

	return new Promise((resolve) => {
		const MeasuringComponent = () => {
			useLayoutEffect(() => {
				const measure = measuringFn(container);
				resolve(measure);
			});

			return <div>{component}</div>;
		};

		root.render(<MeasuringComponent />);
	}).then((measure) => {
		root.unmount();
		container.parentNode.removeChild(container);

		return measure;
	});
}
