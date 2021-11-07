jest.mock('../../src/songImporters/getMessageHandlers');

import getSongImporterHandlers from '../../src/songImporters/getMessageHandlers';
import registerHandlers, { _handleMessage } from '../../src/registerHandlers';

const testHandler = jest.fn();
const testEvent = {
	source: window,
	origin: 'https://my.origin.net',
	data: {
		type: 'TYPE/TEST',
		payload: 'myPayload',
	},
};
getSongImporterHandlers.mockReturnValue({
	'TYPE/TEST': testHandler,
});

beforeEach(() => {
	testHandler.mockClear();
	Object.defineProperty(window, 'location', {
		get() {
			return { origin: 'https://my.origin.net' };
		},
	});
});

describe('_handleMessage', () => {
	test('Module', () => {
		expect(registerHandlers).toBeInstanceOf(Function);
		expect(_handleMessage).toBeInstanceOf(Function);
	});

	test('should call the registered handlers', () => {
		const result = _handleMessage(testEvent);

		expect(result).toBe(true);
		expect(testHandler).toHaveBeenCalledTimes(1);
		expect(testHandler).toHaveBeenCalledWith('myPayload');
	});

	test('should not call the handler if e.source !== window', () => {
		const result = _handleMessage({
			...testEvent,
			source: 'somethingElse',
		});

		expect(result).toBe(false);
		expect(testHandler).not.toHaveBeenCalled();
	});

	test('should not call the handler if e.origin !== window.location.origin', () => {
		Object.defineProperty(window, 'location', {
			get() {
				return { origin: 'a different origin' };
			},
		});
		const result = _handleMessage(testEvent);

		expect(result).toBe(false);
		expect(testHandler).not.toHaveBeenCalled();
	});
});
