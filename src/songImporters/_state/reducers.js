import {
	SONG_IMPORTER_SET_CONTENT,
	SONG_IMPORTER_SET_SOURCE_TYPE,
} from './actionsTypes';

const initialState = {
	content: '',
	sourceType: 'basic',
};

export default function reducers(state = initialState, action = {}) {
	switch (action.type) {
		case SONG_IMPORTER_SET_CONTENT: {
			const { content } = action.payload;
			return {
				...state,
				content,
			};
		}

		case SONG_IMPORTER_SET_SOURCE_TYPE: {
			const { sourceType } = action.payload;

			return {
				...state,
				sourceType,
			};
		}
	}
	return state;
}
