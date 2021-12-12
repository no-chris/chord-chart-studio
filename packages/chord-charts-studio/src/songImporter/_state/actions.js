import * as actionsTypes from './actionsTypes';

import createAction from '../../core/createAction';

export const setContent = (content, title) =>
	createAction(actionsTypes.SONG_IMPORTER_SET_CONTENT, { content, title });

export const setInputFormat = (inputFormat) =>
	createAction(actionsTypes.SONG_IMPORTER_SET_INPUT_FORMAT, { inputFormat });

export const startImport = () =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_START, {
		isFromWeb: false,
	});

export const startImportFromWeb = (inputFormat, content, title) =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_START, {
		content,
		inputFormat,
		title,
		isFromWeb: true,
	});

export const cancelImport = () =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_CANCEL);
