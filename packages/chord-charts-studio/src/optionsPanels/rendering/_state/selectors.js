import _difference from 'lodash/difference';

import editorModeOptions from '../../../db/options/editorModeOptions'; // duh!
import { getEditorMode } from '../../../ui/layout/app/_state/selectors';
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

	const chartFormat = getOptionValue(state, 'songFormatting', 'chartFormat');
	if (['chordmarkSrc', 'chordpro'].includes(chartFormat)) {
		nonInteractableWidgets.push('chartType');
		nonInteractableWidgets.push('alignChordsWithLyrics');
		nonInteractableWidgets.push('alignBars');
		nonInteractableWidgets.push('autoRepeatChords');
	}
	if (chartFormat === 'chordmarkSrc') {
		nonInteractableWidgets.push('expandSectionCopy');
	}

	const harmonizeAccidentals = getOptionValue(
		state,
		'songPreferences',
		'harmonizeAccidentals'
	);

	if (!harmonizeAccidentals) {
		nonInteractableWidgets.push('preferredAccidentals');
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
