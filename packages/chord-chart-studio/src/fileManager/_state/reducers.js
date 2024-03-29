import {
	FILE_MANAGER_SELECT_FILE,
	FILE_MANAGER_ENABLE_RENAME,
} from './actionsTypes';

import {
	DB_FILES_CREATE,
	DB_FILES_DELETE,
	DB_FILES_IMPORT,
	DB_FILES_UPDATE,
} from '../../db/files/actionsTypes';

const initialState = {
	selected: '',
	renamed: '',
	defaultTitle: '[untitled]',
};

export default function reducers(state = initialState, action = {}) {
	switch (action.type) {
		case DB_FILES_CREATE: {
			const { id } = action.payload;
			return {
				...state,
				selected: id,
				renamed: id,
			};
		}

		case DB_FILES_IMPORT: {
			const { id } = action.payload;
			return {
				...state,
				selected: id,
				renamed: '',
			};
		}

		case DB_FILES_UPDATE: {
			return {
				...state,
				renamed: '',
			};
		}

		case DB_FILES_DELETE: {
			return {
				...state,
				selected: '',
				renamed: '',
			};
		}

		case FILE_MANAGER_SELECT_FILE: {
			const { id } = action.payload;
			return {
				...state,
				selected: id,
				renamed: id === state.renamed ? id : '',
			};
		}

		case FILE_MANAGER_ENABLE_RENAME: {
			const { id } = action.payload;
			return {
				...state,
				renamed: id,
			};
		}
	}
	return state;
}
