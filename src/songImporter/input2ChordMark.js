import ultimateGuitar2ChordMark from '../core/converters/ultimateGuitar2ChordMark';
import ChordSheetJS from 'chordsheetjs';
import chordSheetJs2ChordMark from '../core/converters/chordSheetJs2ChordMark';

const input2ChordMark = (input, inputFormat) => {
	const converter = getConverter(inputFormat);
	return converter(input);
};

const getConverter = (inputFormat) => {
	if (inputFormat === 'ultimateGuitar') {
		return ultimateGuitar2ChordMark;
	}

	const parser =
		inputFormat === 'chordpro'
			? new ChordSheetJS.ChordProParser()
			: new ChordSheetJS.ChordSheetParser();

	return (input) => {
		const parsed = parser.parse(input);
		return chordSheetJs2ChordMark(parsed);
	};
};

export default input2ChordMark;
