/**
 * Local storage wrapper
 */
const store = {
	create(key, value) {
		if (localStorage.getItem(key)) {
			throw new Error('Already exists key: ' + key);
		}
		if (!key) {
			throw new Error('Cannot create localstorage entry with empty key');
		}
		localStorage.setItem(key, value);
	},

	getOneByKey(key) {
		return localStorage.getItem(key);
	},

	getAllByKeyPrefix(keyPrefix) {
		const allEntries = {};

		let key;

		for (let i = 0; i < localStorage.length; i++) {
			key = localStorage.key(i);
			if (key.indexOf(keyPrefix) === 0) {
				allEntries[key] = localStorage.getItem(key);
			}
		}

		return allEntries;
	},

	update(key, value) {
		if (!localStorage.getItem(key)) {
			throw new Error('Cannot find and update key: ' + key);
		}
		localStorage.setItem(key, value);
	},

	delete(key) {
		localStorage.removeItem(key);
	}
};

export default store;