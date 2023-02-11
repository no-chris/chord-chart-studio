import { saveAs } from 'file-saver';
import { getStore } from '../state/store';

import { getSelectedId } from './_state/selectors';
import { getOne } from '../db/files/selectors';
import { getOptionValue } from '../db/options/selectors';

import { renderAsText } from '../core/renderSong';

export default function exportSelectedFileAsText() {
	const store = getStore();
	const state = store.getState();

	const selectedId = getSelectedId(state);
	const selectedFile = getOne(state, selectedId);

	const renderOptions = {
		chartFormat: getOptionValue(state, 'editorPreferences', 'chartFormat'),

		transposeValue: getOptionValue(
			state,
			'songPreferences',
			'transposeValue'
		),
		accidentalsType: getOptionValue(
			state,
			'songPreferences',
			'accidentalsType'
		),
		symbolType: getOptionValue(state, 'songPreferences', 'symbolType'),

		chartType: getOptionValue(state, 'songFormatting', 'chartType'),
		alignChordsWithLyrics: getOptionValue(
			state,
			'songFormatting',
			'alignChordsWithLyrics'
		),
		alignBars: getOptionValue(state, 'songFormatting', 'alignBars'),
		autoRepeatChords: getOptionValue(
			state,
			'songFormatting',
			'autoRepeatChords'
		),
		expandSectionCopy: getOptionValue(
			state,
			'songFormatting',
			'expandSectionCopy'
		),
	};

	const fileContent = renderAsText(selectedFile.content, renderOptions, true);
	const fileExt = renderOptions.chartFormat === 'chordpro' ? 'cho' : 'txt';
	const fileName = `${selectedFile.title}.${fileExt}`;

	const blob = new Blob([fileContent], {
		type: 'text/plain;charset=utf-8',
		endings: 'native',
	});
	saveAs(blob, fileName);
}
