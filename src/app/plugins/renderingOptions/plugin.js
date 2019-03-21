import pluginFactory from '../../../app/core/plugin';
import htmlToElement from '../../../core/dom/htmlToElement';

import renderingOptionsTpl from './renderingOptions.hbs';

const renderingOptionsPlugin = pluginFactory({
	render() {
		const app = this.getHost();
		const areaBroker = app.getAreaBroker();
		const header = areaBroker.getHeader();

		const renderingOptions = new DocumentFragment();
		renderingOptions.appendChild(htmlToElement(renderingOptionsTpl()));

		const alignBars = renderingOptions.querySelector('[data-option="align-bars"]');
		alignBars.addEventListener('change', e => {
			app.emit('optionchange', {
				alignBars: e.target.checked
			});
		});

		const transposeDown = renderingOptions.querySelector('[data-option="transpose-down"]');
		const transposeUp = renderingOptions.querySelector('[data-option="transpose-up"]');
		const transposeValue = renderingOptions.querySelector('[data-option="transpose-value"]');

		transposeDown.addEventListener('click', () => transpose(-1));
		transposeUp.addEventListener('click', () => transpose(1));

		function transpose(step) {
			const currentTransposeValue = Number.parseInt(transposeValue.innerText);
			const newTransposeValue = currentTransposeValue + step;
			app.emit('optionchange', {
				transposeValue: newTransposeValue
			});
			transposeValue.innerText = (newTransposeValue) > 0 ?'+' + newTransposeValue : newTransposeValue;
		}

		// attach to document
		header.appendChild(renderingOptions);
	}
});

export default renderingOptionsPlugin;

