import { renderSong as renderSongCm, parseSong } from 'chord-mark';

export default function renderSong(songTxt, renderOptions) {
	const parsed = parseSong(songTxt);
	try {
		return renderSongCm(parsed, {
			...renderOptions,
			printChordsDuration: 'uneven',
		});
	} catch (e) {
		return e.message;
	}
}
