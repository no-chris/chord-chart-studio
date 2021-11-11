import _cloneDeep from 'lodash/cloneDeep';

export const getOptionValue = (state, context, key) => {
	if (
		!state.db.options[context] ||
		!state.db.options[context].values ||
		typeof state.db.options[context].values[key] === 'undefined'
	) {
		return;
	}
	return state.db.options[context].values[key];
};

export const getAllOptionValues = (state, context) => {
	if (!state.db.options[context] || !state.db.options[context].values) {
		return;
	}
	return _cloneDeep(state.db.options[context].values);
};

export const getOptionsDefaults = (state, context) => {
	if (!state.db.options[context] || !state.db.options[context].defaults) {
		return;
	}
	return _cloneDeep(state.db.options[context].defaults);
};
