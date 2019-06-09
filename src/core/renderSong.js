import { renderSong as renderSongCm, parseSong } from 'chord-mark';

export default function renderSong(songTxt, renderOptions) {
	const parsed = parseSong(songTxt);
	return renderSongCm(parsed, renderOptions);
}
