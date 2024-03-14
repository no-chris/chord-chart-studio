import _ from 'lodash';

import React from 'react';
import {
	withStore,
	getState,
	resetStore,
	dispatch,
} from '../../../helpers/withStore';

import { render, cleanup, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import Rendering from '../../../../../src/optionsPanels/rendering/_containers/Rendering';
import allWidgets from '../../../../../src/optionsPanels/rendering/allWidgets';

import * as optionsSelectors from '../../../../../src/db/options/selectors';
import { editorModeChanged } from '../../../../../src/ui/layout/app/reducers';
import * as fmActions from '../../../../../src/fileManager/_state/actions';

afterEach(cleanup);

describe('"Rendering" option panel', () => {
	beforeEach(() => {
		resetStore();
	});

	describe('Option Groups', () => {
		test('Render no optionGroups if no file is selected', () => {
			const { queryByText } = render(withStore(<Rendering />));

			const allLabels = _.chain(allWidgets.allWidgets)
				.pickBy((widget) => widget.type === 'optionsGroup')
				.map((widget) => widget.label)
				.value();

			expect(queryByText(allLabels[0])).toBeNull();
			expect(queryByText(allLabels[1])).toBeNull();
			expect(queryByText(allLabels[2])).toBeNull();
			expect(queryByText(allLabels[2])).toBeNull();
		});
	});

	describe('Some widgets should be hidden depending on editor Mode', () => {
		test.skip('All widgets should be disabled if no file is selected', () => {
			//todo
		});

		test.skip('Edit mode', () => {
			dispatch(fmActions.selectFile('myId'));
			dispatch(editorModeChanged('edit'));

			const { queryByText } = render(withStore(<Rendering />));

			const preferredAccidentals = queryByText(
				allWidgets.allWidgets.key.allGroupWidgets.preferredAccidentals
					.label
			);

			const alignChordsWithLyrics = queryByText(
				allWidgets.allWidgets.preferences.allGroupWidgets
					.alignChordsWithLyrics.label
			);

			const columnBreakOnSection = queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets
					.columnBreakOnSection.label
			);

			const fontSize = queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets.fontSize.label
			);

			expect(preferredAccidentals).toBeInTheDocument();
			expect(alignChordsWithLyrics).toBeNull();
			expect(columnBreakOnSection).toBeNull();
			expect(fontSize).toBeNull();
		});

		test('Play mode', () => {
			dispatch(fmActions.selectFile('myId'));
			dispatch(editorModeChanged('play'));

			const { queryByText } = render(withStore(<Rendering />));

			const columnBreakOnSection = queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets
					.columnBreakOnSection.label
			);

			expect(columnBreakOnSection).toBeNull();
		});

		test('Print mode', () => {
			dispatch(fmActions.selectFile('myId'));
			dispatch(editorModeChanged('print'));

			const { queryByText } = render(withStore(<Rendering />));

			const theme = queryByText(
				allWidgets.allWidgets.editorPreferences.allGroupWidgets.theme
					.label + ':'
			);

			expect(theme).toBeNull();
		});

		test('Export mode', () => {
			dispatch(fmActions.selectFile('myId'));
			dispatch(editorModeChanged('export'));

			const { queryByText } = render(withStore(<Rendering />));

			const columnBreakOnSection = queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets
					.columnBreakOnSection.label
			);
			const fontSize = queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets.fontSize.label
			);

			expect(columnBreakOnSection).toBeNull();
			expect(fontSize).toBeNull();
		});
	});

	describe('options widgets should be connected to store', () => {
		test('chartFormat', async () => {
			dispatch(fmActions.selectFile('myId'));
			dispatch(editorModeChanged('export'));

			const { getByText } = render(withStore(<Rendering />));

			const chartFormat = getByText(
				allWidgets.allWidgets.editorPreferences.allGroupWidgets
					.chartFormat.label + ':'
			);

			act(() => {
				fireEvent.click(chartFormat);
			});

			const cmOption = getByText('ChordMark');
			const chordProOption = getByText('ChordPro');

			act(() => {
				fireEvent.click(cmOption);
			});
			expect(
				optionsSelectors.getOptionValue(
					getState(),
					'editorPreferences',
					'chartFormat'
				)
			).toBe('chordmark');

			act(() => {
				fireEvent.click(chordProOption);
			});
			expect(
				optionsSelectors.getOptionValue(
					getState(),
					'editorPreferences',
					'chartFormat'
				)
			).toBe('chordpro');

			act(() => {
				fireEvent.click(cmOption);
			});
			expect(
				optionsSelectors.getOptionValue(
					getState(),
					'editorPreferences',
					'chartFormat'
				)
			).toBe('chordmark');
		});
	});

	describe('Options dependencies', () => {
		test('Formatting options should be enabled or not depending on chartType value', () => {
			const niClassName = '.sb-optionToggle-isNotInteractable';
			const isDisabled = (element) => {
				return element.closest(niClassName) instanceof Element;
			};

			dispatch(fmActions.selectFile('myId'));
			dispatch(editorModeChanged('play'));

			const { getByText } = render(withStore(<Rendering />));

			const preferencesWidgets =
				allWidgets.allWidgets.preferences.allGroupWidgets;

			const chartType = getByText(
				preferencesWidgets.chartType.label + ':'
			);

			act(() => {
				fireEvent.click(chartType);
			});

			const lyricsOnly = getByText('Lyrics only');
			const chordsOnly = getByText('Chords only');

			const alignChordsWithLyrics = getByText(
				preferencesWidgets.alignChordsWithLyrics.label
			);
			const alignBars = getByText(preferencesWidgets.alignBars.label);
			const autoRepeatChords = getByText(
				preferencesWidgets.autoRepeatChords.label
			);

			expect(isDisabled(alignChordsWithLyrics)).toBe(false);
			expect(isDisabled(alignBars)).toBe(false);
			expect(isDisabled(autoRepeatChords)).toBe(false);

			act(() => {
				fireEvent.click(lyricsOnly);
			});

			expect(isDisabled(alignChordsWithLyrics)).toBe(true);
			expect(isDisabled(alignBars)).toBe(true);
			expect(isDisabled(autoRepeatChords)).toBe(true);

			act(() => {
				fireEvent.click(chordsOnly);
			});

			expect(isDisabled(alignChordsWithLyrics)).toBe(true);
			expect(isDisabled(alignBars)).toBe(false);
			expect(isDisabled(autoRepeatChords)).toBe(false);
		});

		test('Formatting options should be enabled or not depending on chartFormat value', () => {
			const isDisabled = (element, select = false) => {
				const niClassName = select
					? '.sb-optionSelect-isNotInteractable'
					: '.sb-optionToggle-isNotInteractable';
				return element.closest(niClassName) instanceof Element;
			};

			dispatch(fmActions.selectFile('myId'));
			dispatch(editorModeChanged('export'));

			const { getByText } = render(withStore(<Rendering />));

			const preferencesWidgets =
				allWidgets.allWidgets.preferences.allGroupWidgets;

			const chartFormat = getByText(
				allWidgets.allWidgets.editorPreferences.allGroupWidgets
					.chartFormat.label + ':'
			);

			act(() => {
				fireEvent.click(chartFormat);
			});

			const chordmarkSrc = getByText('ChordMark (Source)');

			const chartType = getByText(
				preferencesWidgets.chartType.label + ':'
			);
			const alignChordsWithLyrics = getByText(
				preferencesWidgets.alignChordsWithLyrics.label
			);
			const alignBars = getByText(preferencesWidgets.alignBars.label);
			const autoRepeatChords = getByText(
				preferencesWidgets.autoRepeatChords.label
			);

			expect(isDisabled(chartType, true)).toBe(false);
			expect(isDisabled(alignChordsWithLyrics)).toBe(false);
			expect(isDisabled(alignBars)).toBe(false);
			expect(isDisabled(autoRepeatChords)).toBe(false);

			act(() => {
				fireEvent.click(chordmarkSrc);
			});

			expect(isDisabled(chartType, true)).toBe(true);
			expect(isDisabled(alignChordsWithLyrics)).toBe(true);
			expect(isDisabled(alignBars)).toBe(true);
			expect(isDisabled(autoRepeatChords)).toBe(true);
		});
	});
});
