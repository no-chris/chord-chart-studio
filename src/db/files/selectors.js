import _map from 'lodash/map';
import _isEqual from 'lodash/isEqual';
import _sortBy from 'lodash/sortBy';

import { createSelectorCreator, defaultMemoize } from 'reselect';

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, _isEqual);

// return value should not change when file content changes
export const getAllTitles = createDeepEqualSelector(
	(state) =>
		_map(state.db.files.allFiles, ({ title, id }) => ({ title, id })),
	(allFiles) => _sortBy(allFiles, (o) => o.title.toLowerCase())
);

export const getOne = (state, id) => {
	return state.db.files.allFiles[id];
};
