import { renderSong as renderSongCm, parseSong } from 'chord-mark';
import chordMark2ChordPro from 'chord-mark-2-chordpro';

export default function renderSong(songTxt, renderOptions = {}) {
	try {
		const parsed = parseSong(songTxt);
		return renderSongCm(parsed, {
			...renderOptions,
			printChordsDuration: 'uneven',
			chordsAndLyricsDisplay: renderOptions.chartType, // fixme
		});
	} catch (e) {
		return e.message;
	}
}

export function renderSongAsChordPro(songTxt, renderOptions = {}) {
	renderOptions.customRenderer = chordMark2ChordPro;
	return renderSong(songTxt, renderOptions);
}
