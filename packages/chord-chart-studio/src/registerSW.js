const serviceWorkerPath = '/service-worker.js';

export default function registerSW() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register(serviceWorkerPath)
			.catch((err) => console.log('Cannot register service worker', err));
	}
}
