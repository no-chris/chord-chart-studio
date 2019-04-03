import { combineReducers } from 'redux';

import ui from './ui/reducers';
import fileManager from './fileManager/reducers';

export default combineReducers({
	ui,
	fileManager
});
