/**
 * Local storage wrapper
 * For now, the only accepted values are objects that are automatically serialized
 */
const store = {
	create(key, value) {
		if (localStorage.getItem(key)) {
			throw new Error('Already exists key: ' + key);
		}
		if (!key) {
			throw new Error('Cannot create localstorage entry with empty key');
		}
		localStorage.setItem(key, JSON.stringify(value));
	},

	getOneByKey(key) {
		const value = localStorage.getItem(key);
		return (value) ? JSON.parse(value) : value;
	},

	getAllByKeyPrefix(keyPrefix) {
		const allEntries = {};

		let key;

		for (let i = 0; i < localStorage.length; i++) {
			key = localStorage.key(i);
			if (key.indexOf(keyPrefix) === 0) {
				allEntries[key] = this.getOneByKey(key);
			}
		}

		return allEntries;
	},

	update(key, value) {
		if (!localStorage.getItem(key)) {
			throw new Error('Cannot find and update key: ' + key);
		}
		localStorage.setItem(key, JSON.stringify(value));
	},

	delete(key) {
		localStorage.removeItem(key);
	}
};

export default store;