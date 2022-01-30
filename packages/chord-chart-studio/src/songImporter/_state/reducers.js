import * as actions from './actionsTypes';
import { DB_FILES_IMPORT } from '../../db/files/actionsTypes';

import stripTags from '../../core/stripTags';

const initialState = {
	content: '',
	isFromWeb: false,
	isImporting: false,
	inputFormat: 'auto',
	title: '',
};

export default function reducers(state = initialState, action = {}) {
	switch (action.type) {
		case actions.SONG_IMPORTER_SET_CONTENT: {
			const { content, title = '' } = action.payload;
			return {
				...state,
				content: stripTags(content),
				title: title ? stripTags(title) : state.title,
			};
		}

		case actions.SONG_IMPORTER_SET_INPUT_FORMAT: {
			const { inputFormat } = action.payload;

			return {
				...state,
				inputFormat,
			};
		}

		case DB_FILES_IMPORT:
		case actions.SONG_IMPORTER_IMPORT_CANCEL: {
			return {
				...state,
				content: '',
				title: '',
				isImporting: false,
			};
		}

		case actions.SONG_IMPORTER_IMPORT_START: {
			const { content, inputFormat, title, isFromWeb } = action.payload;

			return {
				...state,
				isImporting: true,
				content: content ? stripTags(content) : '',
				title: title ? stripTags(title) : '',
				inputFormat: inputFormat || state.inputFormat,
				isFromWeb,
			};
		}
	}
	return state;
}
