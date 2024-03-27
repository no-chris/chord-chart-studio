import _difference from 'lodash/difference';

import editorModeOptions from '../../../db/options/editorModeOptions'; // duh!
import { getEditorMode } from '../../../ui/layout/app/reducers';
import { getSelectedId } from '../../../fileManager/_state/selectors';
import {
	getOptionsDefaults,
	getOptionValue,
} from '../../../db/options/selectors';

export const getNonInteractableWidgets = (state) => {
	const nonInteractableWidgets = [];

	const chartType = getOptionValue(state, 'songFormatting', 'chartType');
	if (chartType === 'lyrics') {
		nonInteractableWidgets.push('alignChordsWithLyrics');
		nonInteractableWidgets.push('alignBars');
		nonInteractableWidgets.push('autoRepeatChords');
	} else if (chartType === 'chords') {
		nonInteractableWidgets.push('alignChordsWithLyrics');
	}

	const chartFormat = getOptionValue(
		state,
		'editorPreferences',
		'chartFormat'
	);
	const editorMode = getEditorMode(state);

	if (editorMode === 'export') {
		if (chartFormat === 'chordmarkSrc') {
			nonInteractableWidgets.push('chartType');
			nonInteractableWidgets.push('alignChordsWithLyrics');
			nonInteractableWidgets.push('alignBars');
			nonInteractableWidgets.push('autoRepeatChords');
			nonInteractableWidgets.push('expandSectionCopy');
		}
	}

	return nonInteractableWidgets;
};

export const getHiddenWidgets = (state) => {
	const hiddenWidgets = [];

	const allOptions = Object.keys({
		...getOptionsDefaults(state, 'editorPreferences'),
		...getOptionsDefaults(state, 'songFormatting'),
		...getOptionsDefaults(state, 'songPreferences'),
	});

	const selectedId = getSelectedId(state);
	if (!selectedId) {
		return allOptions;
	}

	const editorMode = getEditorMode(state);

	const nonInteractableOptions = _difference(
		allOptions,
		editorModeOptions[editorMode]
	);

	hiddenWidgets.push(...nonInteractableOptions);

	return hiddenWidgets;
};
