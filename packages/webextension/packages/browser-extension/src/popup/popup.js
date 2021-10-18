console.log('in popup.JS');

function handleMessage(message, sender, sendResponse) {
	switch(message.type) {
		case "tabData": 
			console.log(message.payload);
			sendResponse('received tabDataMessage!');
			break
	}
}

chrome.runtime.onMessage.addListener(
	handleMessage
);

chrome.storage.sync.get(['tabData'], (data) => {
	console.log('')
});