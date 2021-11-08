import { getEditorMode } from '../../../ui/layout/app/_state/selectors';
import { getOptionValue } from '../../../db/options/selectors';

export const getNonInteractableWidgets = (state) => {
	const nonInteractableWidgets = [];

	const editorMode = getEditorMode(state);

	switch (editorMode) {
		case 'edit': {
			nonInteractableWidgets.push('chordsAndLyricsDisplay');
			nonInteractableWidgets.push('layout');
			nonInteractableWidgets.push('style');
			nonInteractableWidgets.push('format');

			break;
		}
		case 'play': {
			nonInteractableWidgets.push('documentSize');
			nonInteractableWidgets.push('documentMargins');
			nonInteractableWidgets.push('columnBreakOnParagraph');
			break;
		}
		case 'print': {
			nonInteractableWidgets.push('chordsColor');
			break;
		}
		case 'export': {
			nonInteractableWidgets.push('format');
			nonInteractableWidgets.push('layout');
			break;
		}
	}

	//const style = getOptionValue(state, 'rendering', 'style');
	//if (style !== 'chordmark') {
	//	nonInteractableWidgets.push('alignBars');
	//}

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
