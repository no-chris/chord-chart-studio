import pluginFactory from '../../../core/pluginFactory';
import htmlToElement from '../../../core/dom/htmlToElement';

import headerTpl from './header.hbs';

const headerPlugin = pluginFactory({
	render() {
		const app = this.getHost();
		const areaBroker = app.getAreaBroker();
		const headerArea = areaBroker.getHeader();

		const header = htmlToElement(headerTpl());

		headerArea.appendChild(header);
	}
});

export default headerPlugin;
