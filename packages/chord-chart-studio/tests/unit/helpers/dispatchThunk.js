export default async function dispatchThunk(state, thunk) {
	const getState = () => state;
	const dispacth = (action) => action;
	return await thunk()(dispacth, getState);
}
