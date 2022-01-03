import { getStore } from '../state/store';
import { startImportFromWeb } from './_state/actions';

/**
 * @typedef {Object} WebsiteImportMessage
 * @type {Object}
 * @property {('ultimateGuitar')} source - website from which the tab comes from
 * @property {('chordPro|ChordOverLyrics')} inputFormat - format to pass to chord-mark-converter
 * @property {String} chordChart - content of the chord chart
 * @property {String} title - song title
 * @property {String} artist - song artist
 */

const songImporterHandlers = {
	/**
	 *
	 * @param {WebsiteImportMessage} message
	 */
	'@CCS/IMPORT_TAB': (message) => {
		const store = getStore();

		const title = buildTitle(message.title, message.artist);
		store.dispatch(
			startImportFromWeb(message.inputFormat, message.chordChart, title)
		);
	},
};

const buildTitle = (songTitle, artist) => {
	let title = songTitle;
	if (artist) {
		title += ' - ' + artist;
	}
	return title;
};

export default function getSongImporterHandlers() {
	return songImporterHandlers;
}
