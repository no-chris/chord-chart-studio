import { getStore } from './state/store';

import { getAllTitles } from './db/files/selectors';
import { importFile } from './db/files/actions';

import gettingStarted from './gettingStarted.txt';
import sampleSong from './sampleSong.txt';

export default function addSampleContent() {
	const store = getStore();
	const state = store.getState();

	const allTitles = getAllTitles(state);

	if (allTitles.length === 0) {
		store.dispatch(importFile('Hallelujah - Leonard Cohen', sampleSong));
		store.dispatch(importFile('Getting started', gettingStarted));
	}
}
