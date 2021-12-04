import {
	renderSong as renderSongCm,
	parseSong,
} from '../../../chord-mark/packages/chord-mark/src/chordMark';

import chordMark2ChordPro from '../../../chord-mark/packages/chord-mark-2-chordpro/src/chordMark2ChordPro';

export default function renderSong(songTxt, renderOptions) {
	const parsed = parseSong(songTxt);
	try {
		return renderSongCm(parsed, {
			...renderOptions,
			printChordsDuration: 'uneven',
			chordsAndLyricsDisplay: renderOptions.chartType, // fixme
		});
	} catch (e) {
		return e.message;
	}
}

export function renderSongAsChordPro(songTxt, renderOptions) {
	renderOptions.customRenderer = chordMark2ChordPro;
	return renderSong(songTxt, renderOptions);
}
