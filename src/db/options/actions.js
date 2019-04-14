import createAction from '../../core/createAction';
import * as actionTypes from './actionsTypes';


export const setOptionValue = (context, key, value) => {
	if (!context) {
		throw new TypeError('Cannot set an option without a context');
	}
	if (!key) {
		throw new TypeError('Cannot set an option without a key');
	}
	const payload = {
		context,
		key,
		value
	};
	return createAction(actionTypes.DB_OPTION_SET_OPTION_VALUE, payload);
};

