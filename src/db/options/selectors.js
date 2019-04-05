
export const getOption = (state, context, key) => {
	return (state.db.options[context] || {})[key];
};

export const getContext = (state, context) => {
	return state.db.options[context];
};
