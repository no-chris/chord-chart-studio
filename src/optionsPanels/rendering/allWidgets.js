/* eslint-disable max-lines */
export default {
	widgetsOrder: [
		'style',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionRepeats',

		'layout',
		'helpers',
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
						value: 'chordmark'
					},
					// {
					// 	id: 'styleChordpro',
					// 	label: 'ChordPro',
					// 	value: 'chordpro'
					// },
				],
			},
			option: {
				context: 'rendering',
				key: 'style'
			},
		},
		alignChordsWithLyrics: {
			label: 'Align chords with lyrics',
			type: 'toggle',
			option: {
				context: 'rendering',
				key: 'alignChordsWithLyrics'
			},
		},
		alignBars: {
			label: 'Align bars',
			type: 'toggle',
			option: {
				context: 'rendering',
				key: 'alignBars'
			},
		},
		autoRepeatChords: {
			label: 'Auto repeat chords',
			type: 'toggle',
			option: {
				context: 'rendering',
				key: 'autoRepeatChords'
			},
		},
		expandSectionRepeats: {
			label: 'Expand section repeats',
			type: 'toggle',
			option: {
				context: 'rendering',
				key: 'expandSectionRepeats'
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
								value: 'a4'
							},
							{
								id: 'documentSizeBooxMax2Pro',
								label: 'Boox Max 2 Pro',
								value: 'booxmax2pro'
							},
						],
					},
					option: {
						context: 'rendering',
						key: 'documentSize'
					},
				},

				documentMargins: {
					label: 'Margins',
					type: 'slider',
					typeOptions: {
						min: 1,
						max: 5
					},
					option: {
						context: 'rendering',
						key: 'documentMargins'
					},
				},

				columnsCount: {
					label: 'Columns',
					type: 'slider',
					typeOptions: {
						min: 1,
						max: 4
					},
					option: {
						context: 'rendering',
						key: 'columnsCount'
					},
				},

				columnBreakOnParagraph: {
					label: 'Break on paragraph',
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'columnBreakOnParagraph'
					},
				},
			}
		},


		helpers: {
			type: 'optionsGroup',
			label: 'Helpers',
			icon: 'remove_red_eye',

			groupWidgetsOrder: [
				'showChords',
				'instrument',
				'showStrummingPattern',
			],

			allGroupWidgets: {
				showChords: {
					label: 'Show chords diagrams',
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'showChords'
					},
				},

				instrument: {
					label: 'Instrument',
					type: 'select',
					typeOptions: {
						allChoices: [
							{
								id: 'instrumentGuitar',
								label: 'Guitar',
								value: 'guitar'
							},
							{
								id: 'instrumentUkulele',
								label: 'Ukulele',
								value: 'ukulele'
							},
							{
								id: 'instrumentMandolin',
								label: 'Mandolin',
								value: 'mandolin'
							},
							{
								id: 'instrumentPiano',
								label: 'Piano',
								value: 'piano'
							},
						],
					},
					option: {
						context: 'rendering',
						key: 'instrument'
					},
				},

				showStrummingPattern: {
					label: 'Show strumming pattern',
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'showStrummingPattern'
					},
				},
			}
		},


		chords: {
			type: 'optionsGroup',
			label: 'Chords',
			icon: 'music_note',

			groupWidgetsOrder: [
				'transposeValue',
				'simplifyChords',
				'capoPosition',
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
						context: 'rendering',
						key: 'transposeValue'
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
						context: 'rendering',
						key: 'simplifyChords'
					},
				},

				capoPosition: {
					label: 'Add capo on fret',
					type: 'slider',
					typeOptions: {
						min: 0,
						max: 11,
						showPlusSymbol: false,
					},
					option: {
						context: 'rendering',
						key: 'capoPosition'
					},
				},

				harmonizeAccidentals: {
					label: 'Harmonize accidentals',
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'harmonizeAccidentals'
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
								value: 'auto'
							},
							{
								id: 'preferredAccidentalsSharp',
								label: 'Sharp (#)',
								value: 'sharp'
							},
							{
								id: 'preferredAccidentalsFlat',
								label: 'Flats (b)',
								value: 'flat'
							},
						],
					},
					option: {
						context: 'rendering',
						key: 'preferredAccidentals'
					},
				},

				useShortNamings: {
					label: 'Use short names',
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'useShortNamings'
					},
				},
			}
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
						context: 'rendering',
						key: 'fontSize'
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
						context: 'rendering',
						key: 'printFontSize'
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
								value: 'roboto'
							},
						],
					},
					option: {
						context: 'rendering',
						key: 'fontStyle'
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
								value: 'base'
							},
							{
								id: 'chordsColorRed',
								label: 'Red',
								value: 'red'
							},
							{
								id: 'chordsColorYellow',
								label: 'Yellow',
								value: 'yellow'
							},
							{
								id: 'chordsColorGreen',
								label: 'Green',
								value: 'green'
							},
						],
					},
					option: {
						context: 'rendering',
						key: 'chordsColor'
					},
				},

				highlightChords: {
					label: 'Highlight Chords',
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'highlightChords'
					},
				},
			}
		},
	},
};
