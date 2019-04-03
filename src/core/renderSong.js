import { renderSong as renderSongUcc, parseSong } from '@touffi/ucc';

export default function renderSong(songTxt) {
	const parsed = parseSong(songTxt);
	return renderSongUcc(parsed);
}
