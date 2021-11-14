import * as actions from './actionsTypes';

const initialState = {
	isImporting: false,
	content: '',
	sourceType: 'basic',
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

		case actions.SONG_IMPORTER_IMPORT_EXEC:
		case actions.SONG_IMPORTER_IMPORT_CANCEL: {
			return {
				...state,
				content: '',
				isImporting: false,
			};
		}

		case actions.SONG_IMPORTER_IMPORT_START: {
			return {
				...state,
				isImporting: true,
			};
		}
	}
	return state;
}
