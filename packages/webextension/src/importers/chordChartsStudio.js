const handleMessage = function handleMessage(message, sender, sendResponse) {
	setTimeout(() => window.postMessage(message), 1000); // defer
	sendResponse('ok');
	return true;
};

chrome.runtime.onMessage.addListener(handleMessage);
