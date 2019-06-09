import { getEditorMode } from '../../../ui/layout/app/_state/selectors';
import { getOptionValue } from '../../../db/options/selectors';

export const getNonInteractableWidgets = (state) => {
	const nonInteractableWidgets = [];

	const editorMode = getEditorMode(state);

	switch (editorMode) {
		case 'edit': {
			nonInteractableWidgets.push('helpers');
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

	//const showChords = getOptionValue(state, 'rendering', 'showChords');
	const harmonizeAccidentals = getOptionValue(state, 'rendering', 'harmonizeAccidentals');

	//if (!showChords) {
	//	hiddenWidgets.push('instrument');
	//}
	if (!harmonizeAccidentals) {
		hiddenWidgets.push('preferredAccidentals');
	}

	if (editorMode === 'print') {
		hiddenWidgets.push('fontSize');
	} else {
		hiddenWidgets.push('printFontSize');
	}

	hiddenWidgets.push('helpers');
	//hiddenWidgets.push('simplifyChords');
	hiddenWidgets.push('capoPosition');

	return hiddenWidgets;
};
