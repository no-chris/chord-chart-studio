export default function createAction(type, payload) {
	if (!type) {
		throw new TypeError('Cannot create an action without an action type');
	}
	return {
		type,
		payload
	};
}
