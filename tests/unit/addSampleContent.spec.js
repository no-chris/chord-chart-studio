import {
	dispatch,
	getState,
	resetStore,
} from '../integration/helpers/withStore';

import addSampleContent from '../../src/addSampleContent';
import { getAllTitles } from '../../src/db/files/selectors';
import { importFile } from '../../src/db/files/actions';

beforeEach(() => {
	resetStore();
});

describe('addSampleContent', () => {
	test('Module', () => {
		expect(typeof addSampleContent).toBe('function');
	});

	test('should create sample content if the files list is empty', () => {
		addSampleContent();

		const state = getState();

		const allTitles = getAllTitles(state);

		expect(allTitles.length).toBe(2);
		expect(allTitles[1].title).toBe('Hallelujah - Leonard Cohen');
		expect(allTitles[0].title).toBe('Getting started');
	});

	test('should not create sample content if files already exist', () => {
		dispatch(importFile('myTitle', 'myContent'));

		let state = getState();
		let allTitles = getAllTitles(state);

		expect(allTitles.length).toBe(1);
		expect(allTitles[0].title).toBe('myTitle');

		addSampleContent();

		state = getState();
		allTitles = getAllTitles(state);

		expect(allTitles.length).toBe(1);
		expect(allTitles[0].title).toBe('myTitle');
	});
});
