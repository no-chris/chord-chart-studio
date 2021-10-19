import { renderSong as renderSongCm, parseSong } from '../../../chord-mark/src/chordMark';

export default function renderSong(songTxt, renderOptions) {
	const parsed = parseSong(songTxt);
	return renderSongCm(parsed, { ...renderOptions, printChordsDuration: 'uneven' });
}
