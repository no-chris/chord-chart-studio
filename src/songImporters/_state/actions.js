import * as actionsTypes from './actionsTypes';

import createAction from '../../core/createAction';

export const setContent = (content) =>
	createAction(actionsTypes.SONG_IMPORTER_SET_CONTENT, { content });

export const setSourceType = (sourceType) =>
	createAction(actionsTypes.SONG_IMPORTER_SET_SOURCE_TYPE, { sourceType });

export const startImport = () =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_START);

export const cancelImport = () =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_CANCEL);

export const doImport = () =>
	createAction(actionsTypes.SONG_IMPORTER_IMPORT_EXEC);
