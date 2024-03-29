import * as selectors from '../../../../src/songImporter/_state/selectors';

describe('songImporter: selectors', () => {
	const state = {
		songImporter: {
			content: 'myContent',
			isImporting: true,
			isFromWeb: true,
			inputFormat: 'ultimateGuitar',
			title: 'myTitle',
		},
	};

	describe('getContent()', () => {
		test('should return content', () => {
			expect(selectors.getContent(state)).toBe('myContent');
		});
	});

	describe('getInputFormat()', () => {
		test('should return inputFormat', () => {
			expect(selectors.getInputFormat(state)).toBe('ultimateGuitar');
		});
	});

	describe('getTitle()', () => {
		test('should return title', () => {
			expect(selectors.getTitle(state)).toBe('myTitle');
		});
	});

	describe('isImporting()', () => {
		test('should return isImporting', () => {
			expect(selectors.isImporting(state)).toBe(true);
		});
	});

	describe('isFromWeb()', () => {
		test('should return isFromWeb', () => {
			expect(selectors.isFromWeb(state)).toBe(true);
		});
	});
});
