import { GET_TAB_DATA } from '../core/messageTypes';

import { sendMessage } from '../core/sendMessage';
import createMessage from '../core/createMessage';
import { SET_TAB_DATA } from '../core/messageTypes';

let tabData;

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

			tabData = {
				source: 'ultimateGuitar',
				data: jsStore,
			};
			const setTabData = createMessage(SET_TAB_DATA, tabData);
			sendMessage(setTabData).catch(console.log);
		} else {
			console.log('cannot find jsStore');
		}
	});

function handleMessage(message, sender, sendResponse) {
	switch (message.type) {
		case GET_TAB_DATA:
			sendResponse(tabData);
			break;
	}
}

chrome.runtime.onMessage.addListener(handleMessage);
