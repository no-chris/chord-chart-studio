import nanoid from 'nanoid';

import store from '../../core/localStorage';

const keyPrefix = 'song:';

export default {
	create({ title = '', content = ''} = {}) {
		const key = keyPrefix + nanoid(20);
		const newFile = {
			key,
			title,
			content
		};
		store.create(key, newFile);

		return newFile;
	},

	getAll() {
		return store.getAllByKeyPrefix(keyPrefix);
	},

	getOneByKey(key) {
		return store.getOneByKey(key);
	},

	updateContent(key, content) {
		const file = store.getOneByKey(key);
		file.content = content;

		store.update(key, file);
	},

	updateTitle(key, title) {
		const file = store.getOneByKey(key);
		file.title = title;

		store.update(key, file);
	},

	deleteOne(key) {
		store.delete(key);
	}
};

