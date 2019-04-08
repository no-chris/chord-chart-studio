export default [
	{ widgetId: 'groupLabel', key: 'layout', label: 'Layout', icon: 'view_compact', isEnabled: true, isVisible: true },

	{ widgetId: 'documentSize', 			isEnabled: false, 	isVisible: true },
	{ widgetId: 'columnsCount', 			isEnabled: true, 	isVisible: true },
	{ widgetId: 'columnBreakOnParagraph', 	isEnabled: true, 	isVisible: false },

	{ widgetId: 'groupLabel', key: 'display', label: 'Display', icon: 'remove_red_eye', isEnabled: true, isVisible: true },

	{ widgetId: 'style', 				isEnabled: true, 	isVisible: true },
	{ widgetId: 'alignBars',			isEnabled: true, 	isVisible: true },
	{ widgetId: 'showChords', 			isEnabled: true, 	isVisible: true },
	{ widgetId: 'instrument', 			isEnabled: true, 	isVisible: false },
	{ widgetId: 'showStrummingPattern', isEnabled: false, 	isVisible: true },

	{ widgetId: 'groupLabel', key: 'chords', label: 'Chords', icon: 'music_note', isEnabled: true, isVisible: true },

	{ widgetId: 'simplifyChords',		isEnabled: true, 	isVisible: true },
	{ widgetId: 'transposeValue',		isEnabled: true, 	isVisible: true },
	{ widgetId: 'capoPosition', 		isEnabled: true, 	isVisible: true },
	{ widgetId: 'harmonizeAccidentals', isEnabled: true, 	isVisible: true },
	{ widgetId: 'preferredAccidentals', isEnabled: true, 	isVisible: true },

	{ widgetId: 'groupLabel', key: 'format', label: 'Format', icon: 'format_size', isEnabled: true, isVisible: true },

	{ widgetId: 'fontSize', 			isEnabled: true, 	isVisible: true },
	{ widgetId: 'fontStyle', 			isEnabled: true, 	isVisible: true },
	{ widgetId: 'highlightChords', 		isEnabled: true, 	isVisible: true },
	{ widgetId: 'chordsColor', 			isEnabled: true, 	isVisible: true },
];
