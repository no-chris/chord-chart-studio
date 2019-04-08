
export const getOption = (state, context, key) => {
	return (state.db.options[context] || {})[key];
};

export const getOptionValue = (state, context, key) => {
	const optionContext = (state.db.options[context] || {});
	const option = (optionContext || {})[key];

	return (option || {}).value;
};

export const getContext = (state, context) => {
	return state.db.options[context];
};
