import { GET_TAB_DATA } from '../core/messageTypes';
import { sendMessageToActiveTab } from '../core/sendMessage';
import createMessage from '../core/createMessage';

const getTabData = createMessage(GET_TAB_DATA);
let tabData;

document.addEventListener('DOMContentLoaded', function (event) {
	const popupContainer =
		document.getElementsByClassName('popup-container')[0];

	const importTabButton = document.getElementById('import-tab-button');

	sendMessageToActiveTab(getTabData).then((tabDataFromContent) => {
		console.log(tabDataFromContent);
		tabData = tabDataFromContent;
		popupContainer.innerHTML = 'Found!';
	});

	importTabButton.addEventListener('click', () => {
		sendMessageToCCS(tabData);
	});
});

function handleMessage(message, sender, sendResponse) {
	switch (message.type) {
		case 'tabData':
			console.log(message.payload);
			sendResponse('received tabDataMessage!');
			break;
	}
}

chrome.runtime.onMessage.addListener(handleMessage);

export function sendMessageToCCS(message) {
	return new Promise((resolve, reject) => {
		chrome.tabs.query(
			{
				url: ['http://127.0.0.1:8084/'],
			},
			function (tabs) {
				console.log(tabs);
				chrome.tabs.sendMessage(
					tabs[0].id,
					message,
					function (response) {
						if (!response) {
							reject(chrome.runtime.lastError.message);
						}
						resolve(response);
					}
				);
			}
		);
	});
}
// https://stackoverflow.com/questions/23895377/sending-message-from-a-background-script-to-a-content-script-then-to-a-injected/23895822#23895822
