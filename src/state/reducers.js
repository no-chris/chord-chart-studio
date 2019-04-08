import { combineReducers } from 'redux';

import db from '../db/reducers';
import fileManager from '../fileManager/_state/reducers';
import ui from '../ui/reducers';

export default combineReducers({
	db,
	fileManager,
	ui,
});
