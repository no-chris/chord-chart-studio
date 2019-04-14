import uuid from 'uuid';

import createAction from '../../core/createAction';
import * as actionTypes from './actionsTypes';


export const createFile = (title) => {
	if (!title) {
		throw new TypeError('Cannot create a file without title');
	}
	const payload = {
		id: uuid.v4(),
		title,
		content: ''
	};
	return createAction(actionTypes.DB_FILES_CREATE, payload);
};


export const updateFile = (id, { title, content } = {}) => {
	if (!id) {
		throw new TypeError('Cannot update a file without an id');
	}
	const payload = {
		id,
		title,
		content
	};
	return createAction(actionTypes.DB_FILES_UPDATE, payload);
};


export const deleteFile = (id) => {
	return createAction(actionTypes.DB_FILES_DELETE, { id });
};

