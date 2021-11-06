jest.mock('../../../src/songImporters/importers/ultimateGuitar');
jest.mock('../../../src/state/store');
jest.mock('uuid');

import getFromUltimateGuitar from '../../../src/songImporters/importers/ultimateGuitar';
import { getStore } from '../../../src/state/store';
import { v4 as uuidv4 } from 'uuid';

const mockStore = { dispatch: jest.fn() };
getStore.mockReturnValue(mockStore);

import { importFile } from '../../../src/db/files/actions';
import getSongImporterHandlers from '../../../src/songImporters/getMessageHandlers';
const handlers = getSongImporterHandlers();

describe('getSongImporterHandlers()', () => {
	test('Module', () => {
		expect(getSongImporterHandlers).toBeInstanceOf(Function);
	});
});

beforeEach(() => {
	mockStore.dispatch.mockClear();
	getFromUltimateGuitar.mockClear();
});

describe('@CCS/IMPORT_TAB', () => {
	const importTabHandler = handlers['@CCS/IMPORT_TAB'];

	describe('Song title', () => {
		const message = {
			source: 'ultimateGuitar',
			chordChart: 'myUGChordChart',
			title: 'myTitle',
			artist: 'myArtist',
		};

		test('Should not happen the artist name if empty', () => {
			uuidv4.mockReturnValue('myUUID');
			getFromUltimateGuitar.mockReturnValue('myConvertedUGChordChart');
			importTabHandler({
				...message,
				artist: undefined,
			});

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
			expect(mockStore.dispatch).toHaveBeenCalledWith(
				importFile('myTitle', 'myConvertedUGChordChart')
			);
		});
	});

	describe('UltimateGuitar', () => {
		const message = {
			source: 'ultimateGuitar',
			chordChart: 'myUGChordChart',
			title: 'myTitle',
			artist: 'myArtist',
		};

		test('Should call import the file if everything goes well', () => {
			uuidv4.mockReturnValue('myUUID');
			getFromUltimateGuitar.mockReturnValue('myConvertedUGChordChart');
			importTabHandler(message);

			expect(getFromUltimateGuitar).toHaveBeenCalledTimes(1);
			expect(getFromUltimateGuitar).toHaveBeenCalledWith(
				'myUGChordChart'
			);
			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
			expect(mockStore.dispatch).toHaveBeenCalledWith(
				importFile('myTitle - myArtist', 'myConvertedUGChordChart')
			);
		});

		test('Should not dispatch action if no chordChart is returned', () => {
			uuidv4.mockReturnValue('myUUID');
			getFromUltimateGuitar.mockReturnValue(undefined);
			importTabHandler(message);

			expect(getFromUltimateGuitar).toHaveBeenCalledTimes(1);
			expect(getFromUltimateGuitar).toHaveBeenCalledWith(
				'myUGChordChart'
			);
			expect(mockStore.dispatch).not.toHaveBeenCalled();
		});
	});
});
