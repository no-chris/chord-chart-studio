import sendMessage from '../core/sendMessage';

const currentUrl = window.location.href;

fetch(currentUrl)
	.then((response) => response.text())
	.then((html) => {
		const jsStoreRegExp = /<div class="js-store" data-content="(.*)">/g;
		const jsStoreQuery = jsStoreRegExp.exec(html);

		if (jsStoreQuery) {
			const parsable = jsStoreQuery[1].replace(/&quot;/g, '"');
			const jsStore = JSON.parse(parsable);
			console.log(jsStore);

			const message = {
				type: 'tabData',
				payload: {
					source: 'ultimateGuitar',
					data: jsStore,
				},
			};
			sendMessage(message)
				.then((response) => {
					console.log(response);
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			console.log('cannot find jsStore');
		}
	});
