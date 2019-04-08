import createAction from '../../core/createAction';

import * as actionsTypes from './actionsTypes';

export const selectFile = (id) => createAction(actionsTypes.FILE_MANAGER_SELECT_FILE, { id });

export const enableRename = (id) => createAction(actionsTypes.FILE_MANAGER_ENABLE_RENAME, { id });




