import * as actions from './actionsTypes';
import { DB_FILES_IMPORT } from '../../db/files/actionsTypes';

const initialState = {
	content: '',
	isFromWeb: false,
	isImporting: false,
	sourceType: 'basic',
	title: '',
};

export default function reducers(state = initialState, action = {}) {
	switch (action.type) {
		case actions.SONG_IMPORTER_SET_CONTENT: {
			const { content } = action.payload;
			return {
				...state,
				content,
			};
		}

		case actions.SONG_IMPORTER_SET_SOURCE_TYPE: {
			const { sourceType } = action.payload;

			return {
				...state,
				sourceType,
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
			const { content, sourceType, title, isFromWeb } = action.payload;

			return {
				...state,
				isImporting: true,
				content: content || '',
				title: title || '',
				sourceType: sourceType || state.sourceType,
				isFromWeb,
			};
		}
	}
	return state;
}
