import pluginFactory from '../../core/pluginFactory';
import htmlToElement from '../../core/dom/htmlToElement';

import renderingOptionsTpl from './renderingOptions.hbs';

const renderingOptionsPlugin = pluginFactory({
	render() {
		const app = this.getHost();
		const areaBroker = app.getAreaBroker();
		const header = areaBroker.getHeader();

		const renderingOptions = document.createDocumentFragment();
		renderingOptions.appendChild(htmlToElement(renderingOptionsTpl()));


		// align bars
		const alignBars = renderingOptions.querySelector('[data-option="align-bars"]');
		alignBars.addEventListener('change', e => {
			app.emit('optionchange', {
				alignBars: e.target.checked
			});
		});


		// transpose
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


		// Harmonize accidentals
		const harmonizeAccidentals = renderingOptions.querySelector('[data-option="harmonize-accidentals"]');
		harmonizeAccidentals.addEventListener('change', () => {
			const checked = harmonizeAccidentals.querySelector('input[name="ha"]:checked');
			app.emit('optionchange', {
				harmonizeAccidentals: (checked.value === 'true')
			});
		});

		// accidentals type
		const accidentalsType = renderingOptions.querySelector('[data-option="accidentals-type"]');
		accidentalsType.addEventListener('change', () => {
			const checked = accidentalsType.querySelector('input[name="ht"]:checked');
			app.emit('optionchange', {
				accidentalsType: checked.value
			});
		});


		// app.on('optionchange', console.log);

		// attach to document
		header.appendChild(renderingOptions);
	}
});

export default renderingOptionsPlugin;

