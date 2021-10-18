
export default function sendMessage(message) {
	return new Promise((resolve, reject) => {
		chrome.runtime.sendMessage(message, function(response) {
			if (!response) {
				reject(chrome.runtime.lastError.message);
			}
			resolve(response);
		});
	});
}
