import ChordSheetJS from 'chordsheetjs';
import chordSheetJs2ChordMark from '../../core/converters/chordSheetJs2ChordMark';

export default function getFromUltimateGuitar(ugChordChartRaw) {
	const ugChordChart = ugChordChartRaw
		.replace(/\r\n/g, '\n')
		.replace(/\t/g, ' ')
		.replace(/\[\/?ch]/g, '')
		.replace(/\[\/?tab]/g, '');

	const parser = new ChordSheetJS.UltimateGuitarParser();
	const parsed = parser.parse(ugChordChart);

	return chordSheetJs2ChordMark(parsed);
}
