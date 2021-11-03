import getSongImporterHandlers from './songImporters/getMessageHandlers';

export default function registerHandlers() {
	window.addEventListener('message', _handleMessage);
}

// unit test backdoor, not for public usage!
export const _handleMessage = (e) => {
	const allHandlers = {
		...getSongImporterHandlers(),
	};

	if (e.source !== window || e.origin !== window.location.origin) {
		return false;
	}
	const message = e.data;

	if (typeof allHandlers[message.type] === 'function') {
		allHandlers[message.type](message.payload);
	}
	return true;
};
