import { combineReducers } from 'redux';
import files from './files/reducers';
import options from './options/reducers';

export default combineReducers({
	files,
	options,
});
