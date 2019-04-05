import * as actionTypes from './actionTypes';

const initialState = {
	allFiles: {},
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case actionTypes.DB_FILES_CREATE: {
			const { id, title, content } = action.payload;

			const allFiles = { ...state.allFiles };
			allFiles[id] = {
				id,
				title,
				content
			};

			return {
				...state,
				allFiles,
			};
		}

		case actionTypes.DB_FILES_UPDATE: {
			const { id, title, content } = action.payload;

			if ((!title && !content) || !state.allFiles[id]) {
				return state;
			}

			const allFiles = { ...state.allFiles };

			allFiles[id] = { ...allFiles[id] };

			if (title) {
				allFiles[id].title = title;
			}
			if (content) {
				allFiles[id].content = content;
			}
			return {
				...state,
				allFiles,
			};
		}

		case actionTypes.DB_FILES_DELETE: {
			const { id } = action.payload;

			if (!id || !state.allFiles[id]) {
				return state;
			}

			const allFiles = { ...state.allFiles };
			delete allFiles[id];

			return {
				...state,
				allFiles,
			};
		}
	}
	return state;
};
