import createAction from '../../core/createAction';
import pluginId from './id';

const initialState = {
	openedSong: ''
};


/**
 * ==============
 * ACTIONS
 * ==============
 */

const OPEN_SONG = pluginId + '_openSong';

export function openSong(songContent) {
	return createAction(OPEN_SONG, { songContent });
}


/**
 * ==============
 * REDUCERS
 * ==============
 */

export function reducers(state = initialState, action) {
	switch (action.type) {
		case OPEN_SONG: {
			const { songContent } = action.payload;
			return {
				...state,
				openedSong: songContent
			};
		}

	}
	return state;
}


/**
 * ==============
 * SELECTORS
 * ==============
 */

export function getOpenedSong(state) {
	return state[pluginId].openedSong;
}
