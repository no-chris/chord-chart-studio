jest.mock('uuid');
jest.mock('../../../src/state/store');

import { v4 as uuidv4 } from 'uuid';
import { getStore } from '../../../src/state/store';

const mockStore = { dispatch: jest.fn() };
getStore.mockReturnValue(mockStore);

import { startImportFromWeb } from '../../../src/songImporter/_state/actions';
import getSongImporterHandlers from '../../../src/songImporter/getMessageHandlers';
const handlers = getSongImporterHandlers();

describe('getSongImporterHandlers()', () => {
	test('Module', () => {
		expect(getSongImporterHandlers).toBeInstanceOf(Function);
	});
});

beforeEach(() => {
	mockStore.dispatch.mockClear();
});

describe('@CCS/IMPORT_TAB', () => {
	const importTabHandler = handlers['@CCS/IMPORT_TAB'];

	describe('Song title', () => {
		const message = {
			source: 'ultimateGuitar',
			inputFormat: 'chordsOverLyrics',
			chordChart: 'myUGChordChart',
			title: 'myTitle',
			artist: 'myArtist',
		};

		test('Should dispatch "startImportFromWeb" action', () => {
			uuidv4.mockReturnValue('myUUID');
			importTabHandler({
				...message,
			});

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
			expect(mockStore.dispatch).toHaveBeenCalledWith(
				startImportFromWeb(
					'chordsOverLyrics',
					'myUGChordChart',
					'_myArtist - myTitle'
				)
			);
		});

		test('Should not happen the artist name if empty', () => {
			uuidv4.mockReturnValue('myUUID');
			importTabHandler({
				...message,
				artist: undefined,
			});

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
			expect(mockStore.dispatch).toHaveBeenCalledWith(
				startImportFromWeb(
					'chordsOverLyrics',
					'myUGChordChart',
					'_myTitle'
				)
			);
		});
	});
});
