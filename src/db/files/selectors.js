import _map from 'lodash/map';
import _cloneDeep from 'lodash/cloneDeep';
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

export const getCategoryOptions = (state, id, category) => {
	const file = state.db.files.allFiles[id];

	if (!file) return;

	if ((file.options || {})[category]) {
		// handle edge cases where we might have an empty object...
		// of course this _should_ never happen!
		if (Object.keys(file.options[category]).length === 0) return;

		return _cloneDeep(file.options[category]);
	}
};

export const getLatestModeOptions = (state, id) => {
	const file = state.db.files.allFiles[id];

	if (!file) return;

	const fileOptions = file.options || {};

	const allOptionsPerMode = [];
	if (fileOptions.edit) allOptionsPerMode.push({ ...fileOptions.edit });
	if (fileOptions.play) allOptionsPerMode.push({ ...fileOptions.play });
	if (fileOptions.print) allOptionsPerMode.push({ ...fileOptions.print });
	if (fileOptions.export) allOptionsPerMode.push({ ...fileOptions.export });

	if (!allOptionsPerMode.length) return;

	allOptionsPerMode.sort((a, b) => a.updatedAt - b.updatedAt);

	return allOptionsPerMode.reduce(
		(acc, modeOptions) => Object.assign(acc, modeOptions),
		{}
	);
};
