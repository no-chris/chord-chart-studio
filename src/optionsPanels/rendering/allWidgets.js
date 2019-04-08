export default {

	/** Label */
	groupLabel: {
		type: 'groupLabel',
	},



	/** Layout */

	documentSize: {
		label: 'Document size',
		type: 'select',
		typeOption: {
			choices: [
				{
					label: 'A4',
					value: 'a4'
				},
				{
					label: 'iPad',
					value: 'ipad'
				},
			],
		},
		option: {
			context: 'rendering',
			key: 'documentSize'
		}
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
		}
	},

	columnBreakOnParagraph: {
		label: 'Break on paragraph',
		type: 'toggle',
		option: {
			context: 'rendering',
			key: 'columnBreakOnParagraph'
		}
	},



	/** Display */

	style: {
		label: 'Rendering style',
		type: 'select',
		typeOption: {
			choices: [
				{
					label: 'UCC',
					value: 'ucc'
				},
				{
					label: 'Chordpro',
					value: 'chordpro'
				},
			],
		},
		option: {
			context: 'rendering',
			key: 'style'
		}
	},

	alignBars: {
		label: 'Align bars',
		type: 'toggle',
		option: {
			context: 'rendering',
			key: 'alignBars'
		}
	},

	showChords: {
		label: 'Show chords diagrams',
		type: 'toggle',
		option: {
			context: 'rendering',
			key: 'showChords'
		}
	},

	instrument: {
		label: 'Instrument',
		type: 'select',
		typeOption: {
			choices: [
				{
					label: 'Guitar',
					value: 'guitar'
				},
				{
					label: 'Ukulele',
					value: 'ukulele'
				},
				{
					label: 'Mandolin',
					value: 'mandolin'
				},
				{
					label: 'Piano',
					value: 'piano'
				},
			],
		},
		option: {
			context: 'rendering',
			key: 'instrument'
		}
	},

	showStrummingPattern: {
		label: 'Show strumming pattern',
		type: 'toggle',
		option: {
			context: 'rendering',
			key: 'showStrummingPattern'
		}
	},



	/** Customize chords */

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
		}
	},

	simplifyChords: {
		label: 'Simplify chords',
		type: 'toggle',
		option: {
			context: 'rendering',
			key: 'simplifyChords'
		}
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
			key: 'capo'
		}
	},

	harmonizeAccidentals: {
		label: 'Harmonize accidentals',
		type: 'toggle',
		option: {
			context: 'rendering',
			key: 'harmonizeAccidentals'
		}
	},

	preferredAccidentals: {
		label: 'Preferred accidentals',
		type: 'select',
		typeOption: {
			choices: [
				{
					label: 'Auto',
					value: 'auto'
				},
				{
					label: 'Sharp (#)',
					value: 'sharp'
				},
				{
					label: 'Flats (b)',
					value: 'flat'
				},
			],
		},
		option: {
			context: 'rendering',
			key: 'preferredAccidentals'
		}
	},



	/** Format */

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
		}
	},

	fontStyle: {
		label: 'Font style',
		type: 'select',
		typeOption: {
			choices: [
				{
					label: 'Roboto',
					value: 'roboto'
				},
			],
		},
		option: {
			context: 'rendering',
			key: 'fontStyle'
		}
	},

	highlightChords: {
		label: 'Highlight Chords',
		type: 'toggle',
		option: {
			context: 'rendering',
			key: 'highlightChords'
		}
	},

	chordsColor: {
		label: 'Chords color',
		type: 'select',
		typeOption: {
			choices: [
				{
					label: 'Black',
					value: 'black'
				},
				{
					label: 'Red',
					value: 'red'
				},
			],
		},
		option: {
			context: 'rendering',
			key: 'chordsColor'
		}
	},
};
