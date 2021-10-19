console.log('in CCS script!');

const handleMessage = function handleMessage(message, sender, sendResponse) {
	window.postMessage(message);
};

chrome.runtime.onMessage.addListener(handleMessage);
