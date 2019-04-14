import * as actionTypes from './actionsTypes';

const initialState = {
	allFiles: {},
};

function createFile(state, action) {
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


function updateFile(state, action) {
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


function deleteFile(state, action) {
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


export default (state = initialState, action = {}) => {
	switch (action.type) {
		case actionTypes.DB_FILES_CREATE: return createFile(state, action);
		case actionTypes.DB_FILES_UPDATE: return updateFile(state, action);
		case actionTypes.DB_FILES_DELETE: return deleteFile(state, action);
	}
	return state;
};
