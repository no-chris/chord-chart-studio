import './getDimensionsFromDom.scss';

import React from 'react';
import ReactDOM from 'react-dom';

export default function getDimensionsFromDom(component, measuringFn) {
	const container = document.createElement('div');
	container.classList.add('measuring-node');
	document.body.appendChild(container);

	return new Promise(resolve => {
		ReactDOM.render(<div>{component}</div>, container, () => {

			const measure = measuringFn(container);

			ReactDOM.unmountComponentAtNode(container);
			container.parentNode.removeChild(container);

			resolve(measure);
		});
	});
}
