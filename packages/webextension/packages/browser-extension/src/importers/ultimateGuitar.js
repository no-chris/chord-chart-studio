import { GET_TAB_DATA } from '../core/messageTypes';

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
			tabData = getStructuredTabData(jsStore);
			console.log(jsStore);
			/*
			tabData = {
				source: 'ultimateGuitar',
				data: jsStore,
			};
			const setTabData = createMessage(SET_TAB_DATA, tabData);
			sendMessage(setTabData).catch(console.log);
			
			 */
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

function getStructuredTabData(jsStore) {
	if (!jsStore.store || !jsStore.store.page || !jsStore.store.page.data) {
		return createError('Could not parse the page');
	}
	const pageData = jsStore.store.page.data;
	if (!pageData.tab || !pageData.tab_view) {
		return createError(
			'I know this website, but this page does not look like a chord chart.'
		);
	}
	if (!['Chords', 'Ukulele Chords'].includes(pageData.tab.type)) {
		return createError(
			'Only Chords charts can be imported, you are viewing a tab of type: ' +
				pageData.tab.type_name
		);
	}
	return {
		source: 'ultimateGuitar',
		artist: pageData.tab.artist_name,
		title: pageData.tab.song_name,
		chordChart: pageData.tab_view.wiki_tab.content,
	};
}

function createError(message) {
	return {
		error: true,
		message,
	};
}

chrome.runtime.onMessage.addListener(handleMessage);
