import _findIndex from 'lodash/findIndex';

import {
	FM_SELECT_FILE,
	FM_CREATE_FILE,
	FM_ENABLE_RENAME,
	FM_RENAME_FILE,
	FM_DELETE_FILE,
	FM_LOAD_ALL_FILES,
	FM_UPDATE_FILE_CONTENT
} from './actions-types';

const initialState = {
	allFiles: [],
	selected: '',
	renamed: '',
	defaultTitle: 'Untitled'
};

export default function reducers(state = initialState, action) {
	switch (action.type) {
		case FM_LOAD_ALL_FILES: {
			const { allFiles } = action.payload;
			const selected = allFiles[0].key;

			return {
				...state,
				allFiles,
				selected
			};
		}

		case FM_SELECT_FILE: {
			const { fileKey } = action.payload;
			return {
				...state,
				selected: fileKey,
				renamed: (fileKey === state.renamed) ? fileKey : ''
			};
		}

		case FM_CREATE_FILE: {
			const { newFile } = action.payload;
			const currentFileIndex = _findIndex(state.allFiles, o => o.key === state.selected);
			return {
				...state,
				allFiles: [
					...state.allFiles.slice(0, currentFileIndex + 1),
					newFile,
					...state.allFiles.slice(currentFileIndex + 1)
				]
			};
		}

		case FM_DELETE_FILE: {
			const { toDeleteIndex } = action.payload;

			return {
				...state,
				allFiles: [
					...state.allFiles.slice(0, toDeleteIndex),
					...state.allFiles.slice(toDeleteIndex + 1)
				]
			};
		}

		case FM_RENAME_FILE: {
			const { fileKey, title } = action.payload;
			const toRenameIndex = _findIndex(state.allFiles, o => o.key === fileKey);

			return {
				...state,
				allFiles: [
					...state.allFiles.slice(0, toRenameIndex),
					{
						...state.allFiles[toRenameIndex],
						title
					},
					...state.allFiles.slice(toRenameIndex + 1)
				],
				renamed: ''
			};
		}

		case FM_ENABLE_RENAME: {
			const { fileKey } = action.payload;

			return {
				...state,
				renamed: fileKey
			};
		}

		case FM_UPDATE_FILE_CONTENT: {
			const { fileKey, content } = action.payload;
			const fileIndex = _findIndex(state.allFiles, o => o.key === fileKey);
			return {
				...state,
				allFiles: [
					...state.allFiles.slice(0, fileIndex),
					{
						...state.allFiles[fileIndex],
						content
					},
					...state.allFiles.slice(fileIndex + 1)
				]
			};
		}
	}
	return state;
}
