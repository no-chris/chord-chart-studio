import _mapValues from 'lodash/mapValues';

export const getOptionValue = (state, context, key) => {
	if (!state.db.options[context] || !state.db.options[context][key]) {
		return;
	}
	return state.db.options[context][key].value;
};

export const getContext = (state, context) => {
	if (!state.db.options[context]) {
		return;
	}
	return _mapValues(state.db.options[context], (option) => option.value);
};
