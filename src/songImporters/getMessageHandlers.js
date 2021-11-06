import { importFile } from '../db/files/actions';
import { getStore } from '../state/store';

import getFromUltimateGuitar from './importers/ultimateGuitar';

/**
 * @typedef {Object} WebsiteImportMessage
 * @type {Object}
 * @property {('ultimateGuitar')} source - website from which the tab comes from
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

		let chordChart;

		switch (message.source) {
			case 'ultimateGuitar':
				chordChart = getFromUltimateGuitar(message.chordChart);
				break;
		}

		if (chordChart) {
			const title = buildTitle(message.title, message.artist);
			store.dispatch(importFile(title, chordChart));
		}
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
