export function sendMessage(message) {
	return new Promise((resolve, reject) => {
		chrome.runtime.sendMessage(message, function (response) {
			if (!response) {
				reject(chrome.runtime.lastError.message);
			}
			resolve(response);
		});
	});
}

export function sendMessageToActiveTab(message) {
	return new Promise((resolve, reject) => {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
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
