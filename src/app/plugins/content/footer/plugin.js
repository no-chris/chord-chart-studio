import pluginFactory from '../../../core/plugin';
import htmlToElement from '../../../../core/dom/htmlToElement';

import footerTpl from './footer.hbs';

const footerPlugin = pluginFactory({
	render() {
		const app = this.getHost();
		const areaBroker = app.getAreaBroker();
		const footerArea = areaBroker.getFooter();

		const footer = htmlToElement(footerTpl());

		footerArea.appendChild(footer);
	}
});

export default footerPlugin;