import nanoid from 'nanoid';
import addEventEmitter from '../../core/addEventEmitter';

import store from '../../core/store';

const keyPrefix = 'song:';

function fileFactory() {
	return {
		key: keyPrefix + nanoid(20),
		title: 'untitled', //todo: translate!
		content: ''
	};
}

export default function fileExplorerFactory() {
	return addEventEmitter({
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
	});
}
