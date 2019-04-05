import uuid from 'uuid';

export default () => next => action => {
	if (action.meta && action.meta.withId === true) {
		action.id = uuid.v4();
	}
	next(action);
};
