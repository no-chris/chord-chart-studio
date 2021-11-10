import _difference from 'lodash/difference';

import editorModeOptions from '../../../db/options/editorModeOptions'; // duh!
import { getEditorMode } from '../../../ui/layout/app/_state/selectors';
import {
	getOptionsDefaults,
	getOptionValue,
} from '../../../db/options/selectors';

export const getNonInteractableWidgets = (state) => {
	const nonInteractableWidgets = [];

	const allOptions = Object.keys({
		...getOptionsDefaults(state, 'songFormatting'),
		...getOptionsDefaults(state, 'songPreferences'),
	});
	const editorMode = getEditorMode(state);

	const nonInteractableOptions = _difference(
		allOptions,
		editorModeOptions[editorMode]
	);

	nonInteractableWidgets.push(...nonInteractableOptions);

	return nonInteractableWidgets;
};

export const getHiddenWidgets = (state) => {
	const hiddenWidgets = [];

	const editorMode = getEditorMode(state);

	const harmonizeAccidentals = getOptionValue(
		state,
		'songPreferences',
		'harmonizeAccidentals'
	);
	/*
	const chordsAndLyricsDisplay = getOptionValue(
		state,
		'rendering',
		'chordsAndLyricsDisplay'
	);

	if (chordsAndLyricsDisplay !== 'all') {
		hiddenWidgets.push('alignChordsWithLyrics');
	}
	
	 */
	if (!harmonizeAccidentals) {
		hiddenWidgets.push('preferredAccidentals');
	}

	if (editorMode === 'print') {
		hiddenWidgets.push('fontSize');
	} else {
		hiddenWidgets.push('printFontSize');
	}

	//hiddenWidgets.push('simplifyChords');

	return hiddenWidgets;
};
