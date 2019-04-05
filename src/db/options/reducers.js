import * as actionTypes from './actionsTypes';

const initialState = {
	options: {},
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case actionTypes.DB_OPTION_SET: {
			const { context, key, value } = action.payload;

			const contextOptions = { ...state.options[context] };
			contextOptions[key] = value;

			const newState = {
				...state,
				options: {
					...state.options
				}
			};
			newState.options[context] = contextOptions;

			return newState;
		}
	}
	return state;
};
