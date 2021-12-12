import _ from 'lodash';

import React from 'react';
import {
	withStore,
	getState,
	resetStore,
	dispatch,
} from '../../../helpers/withStore';

import { render, cleanup, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Rendering from '../../../../../src/optionsPanels/rendering/_containers/Rendering';
import allWidgets from '../../../../../src/optionsPanels/rendering/allWidgets';

import * as optionsSelectors from '../../../../../src/db/options/selectors';
import * as optionsActions from '../../../../../src/db/options/actions';
import * as appActions from '../../../../../src/ui/layout/app/_state/actions';
import * as fmActions from '../../../../../src/fileManager/_state/actions';

afterEach(cleanup);

describe('"Rendering" option panel', () => {
	beforeEach(() => {
		resetStore();
	});

	describe('Option Groups', () => {
		test('Render all optionGroups', () => {
			const { getByText } = render(withStore(<Rendering />));

			const allLabels = _.chain(allWidgets.allWidgets)
				.pickBy((widget) => widget.type === 'optionsGroup')
				.map((widget) => widget.label)
				.value();

			getByText(allLabels[0]);
			getByText(allLabels[1]);
			getByText(allLabels[2]);
		});

		test('Layout group: a click on the group title should toggle widgets visibility', () => {
			dispatch(appActions.setEditorMode('play'));

			const { getByText, queryByText } = render(withStore(<Rendering />));

			const groupLabel = allWidgets.allWidgets.layout.label;
			const group = getByText(groupLabel);

			queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets.columnsCount.label
			);
			queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets
					.columnBreakOnParagraph.label
			);

			act(() => {
				fireEvent.click(group);
			});

			expect(
				queryByText(
					allWidgets.allWidgets.layout.allGroupWidgets.columnsCount
						.label
				)
			).toBeNull();
			expect(
				queryByText(
					allWidgets.allWidgets.layout.allGroupWidgets
						.columnBreakOnParagraph.label
				)
			).toBeNull();

			act(() => {
				fireEvent.click(group);
			});

			queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets.columnsCount.label
			);
			queryByText(
				allWidgets.allWidgets.layout.allGroupWidgets
					.columnBreakOnParagraph.label
			);
		});
	});

	describe('Some widgets should be disabled depending on editor Mode', () => {
		test.skip('All widgets should be disabled if no file is selected', () => {
			//todo
		});

		test('Edit mode', () => {
			const niClassName = '.sb-optionToggle-isNotInteractable';
			dispatch(fmActions.selectFile('myId'));
			dispatch(appActions.setEditorMode('edit'));

			const { getByText } = render(withStore(<Rendering />));

			const harmonizeAccidentals = getByText(
				allWidgets.allWidgets.key.allGroupWidgets.harmonizeAccidentals
					.label
			);

			const alignChordsWithLyrics = getByText(
				allWidgets.allWidgets.preferences.allGroupWidgets
					.alignChordsWithLyrics.label
			);

			const columnBreakOnParagraph = getByText(
				allWidgets.allWidgets.layout.allGroupWidgets
					.columnBreakOnParagraph.label
			);

			const highlightChords = getByText(
				allWidgets.allWidgets.style.allGroupWidgets.highlightChords
					.label
			);

			expect(harmonizeAccidentals.closest(niClassName)).toBeInstanceOf(
				Element
			);
			expect(alignChordsWithLyrics.closest(niClassName)).toBeInstanceOf(
				Element
			);
			expect(columnBreakOnParagraph.closest(niClassName)).toBeInstanceOf(
				Element
			);
			expect(highlightChords.closest(niClassName)).toBeInstanceOf(
				Element
			);
		});

		test('Play mode', () => {
			const niClassName = '.sb-optionToggle-isNotInteractable';
			dispatch(fmActions.selectFile('myId'));
			dispatch(appActions.setEditorMode('play'));

			const { getByText } = render(withStore(<Rendering />));

			const columnBreakOnParagraph = getByText(
				allWidgets.allWidgets.layout.allGroupWidgets
					.columnBreakOnParagraph.label
			);

			expect(columnBreakOnParagraph.closest(niClassName)).toBeInstanceOf(
				Element
			);
		});

		test('Print mode', () => {
			const niClassName = '.sb-optionSelect-isNotInteractable';
			dispatch(fmActions.selectFile('myId'));
			dispatch(appActions.setEditorMode('print'));

			const { getByText } = render(withStore(<Rendering />));

			const chartFormat = getByText(
				allWidgets.allWidgets.preferences.allGroupWidgets.chartFormat
					.label + ':'
			);

			expect(chartFormat.closest(niClassName)).toBeInstanceOf(Element);
		});

		test('Export mode', () => {
			const niClassName = '.sb-optionToggle-isNotInteractable';

			dispatch(fmActions.selectFile('myId'));
			dispatch(appActions.setEditorMode('export'));

			const { getByText } = render(withStore(<Rendering />));

			const columnBreakOnParagraph = getByText(
				allWidgets.allWidgets.layout.allGroupWidgets
					.columnBreakOnParagraph.label
			);
			const highlightChords = getByText(
				allWidgets.allWidgets.style.allGroupWidgets.highlightChords
					.label
			);

			expect(columnBreakOnParagraph.closest(niClassName)).toBeInstanceOf(
				Element
			);
			expect(highlightChords.closest(niClassName)).toBeInstanceOf(
				Element
			);
		});
	});

	describe('options widgets should be connected to store', () => {
		test('chartFormat', async () => {
			dispatch(fmActions.selectFile('myId'));
			dispatch(appActions.setEditorMode('export'));

			const { getByText } = render(withStore(<Rendering />));

			const chartFormat = getByText(
				allWidgets.allWidgets.preferences.allGroupWidgets.chartFormat
					.label + ':'
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
					'songFormatting',
					'chartFormat'
				)
			).toBe('chordmark');

			act(() => {
				fireEvent.click(chordProOption);
			});
			expect(
				optionsSelectors.getOptionValue(
					getState(),
					'songFormatting',
					'chartFormat'
				)
			).toBe('chordpro');

			act(() => {
				fireEvent.click(cmOption);
			});
			expect(
				optionsSelectors.getOptionValue(
					getState(),
					'songFormatting',
					'chartFormat'
				)
			).toBe('chordmark');
		});
	});

	describe('Options dependencies', () => {
		test('PreferredAccidentals should only be displayed if harmonizeAccidentals === true', () => {
			dispatch(fmActions.selectFile('myId'));
			dispatch(appActions.setEditorMode('play'));
			dispatch(
				optionsActions.setOptionValue(
					'songPreferences',
					'harmonizeAccidentals',
					true
				)
			);

			const { getByText, queryByText } = render(withStore(<Rendering />));

			const harmonizeAccidentals = getByText(
				allWidgets.allWidgets.key.allGroupWidgets.harmonizeAccidentals
					.label
			);
			expect(
				getByText(
					allWidgets.allWidgets.key.allGroupWidgets
						.preferredAccidentals.label + ':'
				)
			).toBeInTheDocument();

			act(() => {
				fireEvent.click(harmonizeAccidentals);
			});

			expect(
				queryByText(
					allWidgets.allWidgets.key.allGroupWidgets
						.preferredAccidentals.label
				)
			).toBeNull();

			act(() => {
				fireEvent.click(harmonizeAccidentals);
			});

			expect(
				getByText(
					allWidgets.allWidgets.key.allGroupWidgets
						.preferredAccidentals.label + ':'
				)
			).toBeInTheDocument();
		});

		test('Formatting options should be enabled or not depending on chartType value', () => {
			const niClassName = '.sb-optionToggle-isNotInteractable';
			const isDisabled = (element) => {
				return element.closest(niClassName) instanceof Element;
			};

			dispatch(fmActions.selectFile('myId'));
			dispatch(appActions.setEditorMode('play'));

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
			dispatch(appActions.setEditorMode('export'));

			const { getByText } = render(withStore(<Rendering />));

			const preferencesWidgets =
				allWidgets.allWidgets.preferences.allGroupWidgets;

			const chartFormat = getByText(
				preferencesWidgets.chartFormat.label + ':'
			);

			act(() => {
				fireEvent.click(chartFormat);
			});

			const chordmarkSrc = getByText('ChordMark (Source)');
			const chordpro = getByText('ChordPro');

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

			act(() => {
				fireEvent.click(chordpro);
			});

			expect(isDisabled(chartType, true)).toBe(true);
			expect(isDisabled(alignChordsWithLyrics)).toBe(true);
			expect(isDisabled(alignBars)).toBe(true);
			expect(isDisabled(autoRepeatChords)).toBe(true);
		});
	});
});
