//const CCSUrl = 'http://127.0.0.1:8084/';
const CCSUrl = 'https://chord-charts-studio.netlify.app/app';

export default function sendToChordChartsStudio(message) {
	console.log('sendToChordChartsStudio');
	getCCSTab()
		.then((tab) => {
			if (!tab) {
				return createCCSTab();
			}
			return tab;
		})
		.then((tab) => {
			console.log('tab found', tab.id);

			return sendMessage(tab.id, message).catch(() => {
				console.log('could not snd message, need to enable script');
				return enableCCSContentScript(tab.id).then(() => {
					return sendMessage(tab.id, message);
				});
			});
		});
}

function getCCSTab() {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ url: [CCSUrl] }, (tabs) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError.message);
			} else {
				resolve(tabs.length > 0 ? tabs[0] : null);
			}
		});
	});
}

function createCCSTab() {
	return new Promise((resolve, reject) => {
		chrome.tabs.create({ url: CCSUrl, active: false }, (tab) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError.message);
			} else {
				console.log(tab);
				resolve(tab);
				/*
				tab.onUpdated.addListener((tabId, changeInfo) => {
					if (changeInfo.status === 'complete') {
						resolve(tab);
					}
				});
				
				 */
			}
		});
	});
}

function enableCCSContentScript(tabId) {
	console.log('enabling content script in ', tabId);

	return new Promise((resolve, reject) => {
		chrome.tabs.executeScript(
			tabId,
			{ file: 'build/chordChartsStudio.js' },
			function () {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError.message);
				} else {
					resolve();
				}
			}
		);
	});
}

function sendMessage(tabId, message) {
	return new Promise((resolve, reject) => {
		console.log('sending Message');

		chrome.tabs.sendMessage(tabId, message, (response) => {
			if (chrome.runtime.lastError) {
				console.log('chrome.runtime.lastError');
				reject(chrome.runtime.lastError.message);
			} else {
				console.log('activating');
				chrome.tabs.update(tabId, { active: true }, () => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError.message);
					} else {
						console.log('activated');
						resolve(response);
					}
				});
			}
		});
	});
}
