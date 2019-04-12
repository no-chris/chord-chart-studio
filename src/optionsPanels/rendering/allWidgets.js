export const widgetsInitialState = {
	style:			{ isInteractable: true , isVisible: true, isCollapsed: true },
	styleUcc: 		{ isInteractable: true , isVisible: true },
	styleChordpro: 	{ isInteractable: true , isVisible: true },

	layout: 				{ isInteractable: true , isVisible: true, isCollapsed: true },
	documentSize: 			{ isInteractable: true , isVisible: true, isCollapsed: true },
	documentSizeA4: 		{ isInteractable: true , isVisible: true },
	documentSizeIpad: 		{ isInteractable: true , isVisible: true },
	columnsCount: 			{ isInteractable: false , isVisible: true },
	columnBreakOnParagraph: { isInteractable: true , isVisible: true },

	helpers: 				{ isInteractable: true , isVisible: true, isCollapsed: true },
	alignBars: 				{ isInteractable: true , isVisible: true },
	showChords: 			{ isInteractable: false , isVisible: true },
	instrument: 			{ isInteractable: true , isVisible: true, isCollapsed: true },
	instrumentGuitar: 		{ isInteractable: true , isVisible: true },
	instrumentUkulele: 		{ isInteractable: true , isVisible: true },
	instrumentPiano: 		{ isInteractable: true , isVisible: false },
	instrumentMandolin: 	{ isInteractable: true , isVisible: false },
	showStrummingPattern: 	{ isInteractable: true , isVisible: true },

	chords: 					{ isInteractable: true , isVisible: true },
	transposeValue: 			{ isInteractable: true , isVisible: true },
	simplifyChords: 			{ isInteractable: true , isVisible: true },
	capoPosition: 				{ isInteractable: true , isVisible: true },
	harmonizeAccidentals: 		{ isInteractable: true , isVisible: true },
	preferredAccidentals: 		{ isInteractable: true , isVisible: true, isCollapsed: true },
	preferredAccidentalsAuto: 	{ isInteractable: true , isVisible: true },
	preferredAccidentalsSharp: 	{ isInteractable: true , isVisible: true },
	preferredAccidentalsFlat: 	{ isInteractable: true , isVisible: true },

	format: 			{ isInteractable: false , isVisible: true },
	fontSize: 			{ isInteractable: true , isVisible: true },
	fontStyle: 			{ isInteractable: true , isVisible: true, isCollapsed: true },
	fontStyleRoboto: 	{ isInteractable: true , isVisible: true },
	highlightChords: 	{ isInteractable: true , isVisible: true },
	chordsColor: 		{ isInteractable: true , isVisible: true, isCollapsed: true },
	chordsColorBlack: 	{ isInteractable: true , isVisible: true },
	chordsColorRed: 	{ isInteractable: true , isVisible: true },
};


export const panelLayout = {
	widgetsOrder: [
		'style',
		'layout',
		'helpers',
		'chords',
		'format',
	],

	allWidgets: {
		style: {
			label: 'Rendering style',
			type: 'select',
			typeOption: {
				allChoices: [
					{
						id: 'styleUcc',
						label: 'UCC',
						value: 'ucc'
					},
					{
						id: 'styleChordpro',
						label: 'ChordPro',
						value: 'chordpro'
					},
				],
			},
			option: {
				context: 'rendering',
				key: 'style'
			},
		},


		layout: {
			type: 'optionsGroup',
			label: 'Layout',
			icon: 'view_compact',

			groupWidgetsOrder: [
				'documentSize',
				'columnsCount',
				'columnBreakOnParagraph',
			],
			allGroupWidgets: {
				documentSize: {
					label: 'Document size',
					type: 'select',
					typeOption: {
						allChoices: [
							{
								id: 'documentSizeA4',
								label: 'A4',
								value: 'a4'
							},
							{
								id: 'documentSizeIpad',
								label: 'iPad',
								value: 'ipad'
							},
						],
					},
					option: {
						context: 'rendering',
						key: 'documentSize'
					},
				},

				columnsCount: {
					label: 'Columns',
					type: 'slider',
					typeOption: {
						min: 1,
						max: 3
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
				'alignBars',
				'showChords',
				'instrument',
				'showStrummingPattern',
			],

			allGroupWidgets: {
				alignBars: {
					label: 'Align bars',
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'alignBars'
					},
				},

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
					typeOption: {
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
			],

			allGroupWidgets: {
				transposeValue: {
					label: 'Transpose',
					type: 'slider',
					typeOption: {
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
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'simplifyChords'
					},
				},

				capoPosition: {
					label: 'Add capo on fret',
					type: 'slider',
					typeOption: {
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
					typeOption: {
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
			}
		},


		format: {
			type: 'optionsGroup',
			label: 'Format',
			icon: 'format_size',

			groupWidgetsOrder: [
				'fontSize',
				'fontStyle',
				'highlightChords',
				'chordsColor',
			],

			allGroupWidgets: {
				fontSize: {
					label: 'Font size',
					type: 'slider',
					typeOption: {
						min: -5,
						max: +5,
						showPlusSymbol: true,
					},
					option: {
						context: 'rendering',
						key: 'fontSize'
					},
				},

				fontStyle: {
					label: 'Font style',
					type: 'select',
					typeOption: {
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

				highlightChords: {
					label: 'Highlight Chords',
					type: 'toggle',
					option: {
						context: 'rendering',
						key: 'highlightChords'
					},
				},

				chordsColor: {
					label: 'Chords color',
					type: 'select',
					typeOption: {
						allChoices: [
							{
								id: 'chordsColor',
								label: 'Black',
								value: 'black'
							},
							{
								id: 'chordsColorRed',
								label: 'Red',
								value: 'red'
							},
						],
					},
					option: {
						context: 'rendering',
						key: 'chordsColor'
					},
				},
			}
		},
	},
};
