import * as actionsTypes from './actionsTypes';

import createAction from '../../core/createAction';

export const setContent = (content, title) =>
	createAction(actionsTypes.SONG_IMPORTER_SET_CONTENT, { content, title });

export const setSourceType = (sourceType) =>
	createAction(actionsTypes.SONG_IMPORTER_SET_SOURCE_TYPE, { sourceType });

export const startImport = () =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_START, {
		isFromWeb: false,
	});

export const startImportFromWeb = (sourceType, content, title) =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_START, {
		content,
		sourceType,
		title,
		isFromWeb: true,
	});

export const cancelImport = () =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_CANCEL);
