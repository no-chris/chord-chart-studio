import { getEditorMode } from '../../../ui/layout/app/_state/selectors';
import { getOptionValue } from '../../../db/options/selectors';

export const getNonInteractableWidgets = (state) => {
	const nonInteractableWidgets = [];

	const editorMode = getEditorMode(state);

	switch (editorMode) {
		case 'edit': {
			nonInteractableWidgets.push('alignBars');
			nonInteractableWidgets.push('helpers');
			nonInteractableWidgets.push('layout');
			nonInteractableWidgets.push('style');
			break;
		}
		case 'play': {
			nonInteractableWidgets.push('documentSize');
			nonInteractableWidgets.push('documentMargins');
			break;
		}
		case 'print': {
			break;
		}
		case 'export': {
			nonInteractableWidgets.push('format');
			nonInteractableWidgets.push('layout');
			break;
		}
	}

	const style = getOptionValue(state, 'rendering', 'style');
	if (style !== 'ucc') {
		nonInteractableWidgets.push('alignBars');
	}

	return nonInteractableWidgets;
};

export const getHiddenWidgets = (state) => {
	const nonVisibleWidgets = [];

	const editorMode = getEditorMode(state);

	const showChords = getOptionValue(state, 'rendering', 'showChords');
	const harmonizeAccidentals = getOptionValue(state, 'rendering', 'harmonizeAccidentals');

	if (!showChords) {
		nonVisibleWidgets.push('instrument');
	}
	if (!harmonizeAccidentals) {
		nonVisibleWidgets.push('preferredAccidentals');
	}

	if (editorMode === 'print') {
		nonVisibleWidgets.push('fontSize');
	} else {
		nonVisibleWidgets.push('printFontSize');
	}

	return nonVisibleWidgets;
};
