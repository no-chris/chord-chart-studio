/* eslint-disable max-lines */
export default {
	widgetsOrder: [
		'style',
		'chordsAndLyricsDisplay',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionMultiply',

		'layout',
		'chords',
		'format',
	],

	allWidgets: {
		style: {
			label: 'Rendering style',
			type: 'select',
			typeOptions: {
				allChoices: [
					{
						id: 'styleChordMark',
						label: 'ChordMark',
						value: 'chordmark',
					},
					// {
					// 	id: 'styleChordpro',
					// 	label: 'ChordPro',
					// 	value: 'chordpro'
					// },
				],
			},
			option: {
				context: 'songFormatting',
				key: 'style',
			},
		},
		chordsAndLyricsDisplay: {
			label: 'Chords and lyrics',
			type: 'select',
			typeOptions: {
				allChoices: [
					{
						id: 'cldisplayAll',
						label: 'Display both',
						value: 'all',
					},
					{
						id: 'cldisplayLyrics',
						label: 'Lyrics only',
						value: 'lyrics',
					},
					{
						id: 'cldisplayChords',
						label: 'Chords only',
						value: 'chords',
					},
					{
						id: 'cldisplayChordsFirstLyricLine',
						label: 'Chords + First lyric line',
						value: 'chordsFirstLyricLine',
					},
				],
			},
			option: {
				context: 'songPreferences',
				key: 'chordsAndLyricsDisplay',
			},
		},
		alignChordsWithLyrics: {
			label: 'Align chords with lyrics',
			type: 'toggle',
			option: {
				context: 'songPreferences',
				key: 'alignChordsWithLyrics',
			},
		},
		alignBars: {
			label: 'Align bars',
			type: 'toggle',
			option: {
				context: 'songFormatting',
				key: 'alignBars',
			},
		},
		autoRepeatChords: {
			label: 'Auto repeat chords',
			type: 'toggle',
			option: {
				context: 'songFormatting',
				key: 'autoRepeatChords',
			},
		},
		expandSectionMultiply: {
			label: 'Expand section multiply',
			type: 'toggle',
			option: {
				context: 'songFormatting',
				key: 'expandSectionMultiply',
			},
		},

		layout: {
			type: 'optionsGroup',
			label: 'Layout',
			icon: 'view_compact',

			groupWidgetsOrder: [
				'documentSize',
				'documentMargins',
				'columnsCount',
				'columnBreakOnParagraph',
			],
			allGroupWidgets: {
				documentSize: {
					label: 'Document size',
					type: 'select',
					typeOptions: {
						allChoices: [
							{
								id: 'documentSizeA4',
								label: 'A4',
								value: 'a4',
							},
							{
								id: 'documentSizeBooxMax2Pro',
								label: 'Boox Max 2 Pro',
								value: 'booxmax2pro',
							},
						],
					},
					option: {
						context: 'songFormatting',
						key: 'documentSize',
					},
				},

				documentMargins: {
					label: 'Margins',
					type: 'slider',
					typeOptions: {
						min: 1,
						max: 5,
					},
					option: {
						context: 'songFormatting',
						key: 'documentMargins',
					},
				},

				columnsCount: {
					label: 'Columns',
					type: 'slider',
					typeOptions: {
						min: 1,
						max: 4,
					},
					option: {
						context: 'songFormatting',
						key: 'columnsCount',
					},
				},

				columnBreakOnParagraph: {
					label: 'Break on paragraph',
					type: 'toggle',
					option: {
						context: 'songFormatting',
						key: 'columnBreakOnParagraph',
					},
				},
			},
		},

		chords: {
			type: 'optionsGroup',
			label: 'Chords',
			icon: 'music_note',

			groupWidgetsOrder: [
				'transposeValue',
				'simplifyChords',
				'harmonizeAccidentals',
				'preferredAccidentals',
				'useShortNamings',
			],

			allGroupWidgets: {
				transposeValue: {
					label: 'Transpose',
					type: 'slider',
					typeOptions: {
						min: -11,
						max: 11,
						showPlusSymbol: true,
					},
					option: {
						context: 'songPreferences',
						key: 'transposeValue',
					},
				},

				simplifyChords: {
					label: 'Simplify chords',
					type: 'select',
					typeOptions: {
						allChoices: [
							{
								id: 'simplifyChordsNone',
								label: 'None',
								value: 'none',
							},
							{
								id: 'simplifyChordsMax',
								label: 'Max',
								value: 'max',
							},
							{
								id: 'simplifyChordsCore',
								label: 'Core',
								value: 'core',
							},
						],
					},
					option: {
						context: 'songPreferences',
						key: 'simplifyChords',
					},
				},

				harmonizeAccidentals: {
					label: 'Harmonize accidentals',
					type: 'toggle',
					option: {
						context: 'songPreferences',
						key: 'harmonizeAccidentals',
					},
				},

				preferredAccidentals: {
					label: 'Preferred accidentals',
					type: 'select',
					typeOptions: {
						allChoices: [
							{
								id: 'preferredAccidentalsAuto',
								label: 'Auto',
								value: 'auto',
							},
							{
								id: 'preferredAccidentalsSharp',
								label: 'Sharp (#)',
								value: 'sharp',
							},
							{
								id: 'preferredAccidentalsFlat',
								label: 'Flats (b)',
								value: 'flat',
							},
						],
					},
					option: {
						context: 'songPreferences',
						key: 'preferredAccidentals',
					},
				},

				useShortNamings: {
					label: 'Use short names',
					type: 'toggle',
					option: {
						context: 'songPreferences',
						key: 'useShortNamings',
					},
				},
			},
		},

		format: {
			type: 'optionsGroup',
			label: 'Format',
			icon: 'format_size',

			groupWidgetsOrder: [
				'fontSize',
				'printFontSize',
				'fontStyle',
				'chordsColor',
				'highlightChords',
			],

			allGroupWidgets: {
				fontSize: {
					label: 'Font size',
					type: 'slider',
					typeOptions: {
						min: -5,
						max: +5,
						showPlusSymbol: true,
					},
					option: {
						context: 'songFormatting',
						key: 'fontSize',
					},
				},

				printFontSize: {
					label: 'Font size (print)',
					type: 'slider',
					typeOptions: {
						min: -5,
						max: +5,
						showPlusSymbol: true,
					},
					option: {
						context: 'songFormatting',
						key: 'printFontSize',
					},
				},

				fontStyle: {
					label: 'Font style',
					type: 'select',
					typeOptions: {
						allChoices: [
							{
								id: 'fontStyleRoboto',
								label: 'Roboto',
								value: 'roboto',
							},
						],
					},
					option: {
						context: 'songFormatting',
						key: 'fontStyle',
					},
				},

				chordsColor: {
					label: 'Chords color',
					type: 'select',
					typeOptions: {
						allChoices: [
							{
								id: 'chordsColor',
								label: 'Base',
								value: 'base',
							},
							{
								id: 'chordsColorRed',
								label: 'Red',
								value: 'red',
							},
							{
								id: 'chordsColorYellow',
								label: 'Yellow',
								value: 'yellow',
							},
							{
								id: 'chordsColorGreen',
								label: 'Green',
								value: 'green',
							},
						],
					},
					option: {
						context: 'songFormatting',
						key: 'chordsColor',
					},
				},

				highlightChords: {
					label: 'Highlight Chords',
					type: 'toggle',
					option: {
						context: 'songFormatting',
						key: 'highlightChords',
					},
				},
			},
		},
	},
};
