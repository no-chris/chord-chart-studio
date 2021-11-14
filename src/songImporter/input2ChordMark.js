import ultimateGuitar2ChordMark from '../core/converters/ultimateGuitar2ChordMark';
import ChordSheetJS from 'chordsheetjs';
import chordSheetJs2ChordMark from '../core/converters/chordSheetJs2ChordMark';

const input2ChordMark = (input, sourceType) => {
	const converter = getConverter(sourceType);
	return converter(input);
};

const getConverter = (sourceType) => {
	if (sourceType === 'ultimateGuitar') {
		return ultimateGuitar2ChordMark;
	}

	const parser =
		sourceType === 'chordpro'
			? new ChordSheetJS.ChordProParser()
			: new ChordSheetJS.ChordSheetParser();

	return (input) => {
		const parsed = parser.parse(input);
		return chordSheetJs2ChordMark(parsed);
	};
};

export default input2ChordMark;
