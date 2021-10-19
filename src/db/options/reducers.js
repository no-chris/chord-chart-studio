import * as actionTypes from './actionsTypes';

const initialState = {};

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case actionTypes.DB_OPTION_SET_OPTION_VALUE: {
			const { context, key, value } = action.payload;

			if (!state[context] || !state[context][key]) {
				return state;
			}

			const contextOptions = { ...state[context] };
			contextOptions[key] = {
				...contextOptions[key],
				value,
			};

			const newState = {
				...state,
			};
			newState[context] = contextOptions;

			return newState;
		}
	}
	return state;
};
