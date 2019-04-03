import nanoid from 'nanoid';

import store from './store';

const keyPrefix = 'song:';
const defaultTitle = 'untitled'; //todo: have this as a create() parameter

function fileFactory() {
	return {
		key: keyPrefix + nanoid(20),
		title: defaultTitle,
		content: 'New song!'
	};
}

export default {
	create() {
		const newFile = fileFactory();

		store.create(newFile.key, newFile);

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

