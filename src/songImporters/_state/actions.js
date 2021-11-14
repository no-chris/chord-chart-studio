import {
	SONG_IMPORTER_SET_CONTENT,
	SONG_IMPORTER_SET_SOURCE_TYPE,
} from './actionsTypes';

import createAction from '../../core/createAction';

export const setContent = (content) =>
	createAction(SONG_IMPORTER_SET_CONTENT, { content });

export const setSourceType = (sourceType) =>
	createAction(SONG_IMPORTER_SET_SOURCE_TYPE, { sourceType });
