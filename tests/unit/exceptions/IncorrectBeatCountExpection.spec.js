import IncorrectBeatCountException from '../../../src/exceptions/IncorrectBeatCountException';

describe('IncorrectBeatCountException', () => {
	test('Module', () => {
		expect(IncorrectBeatCountException).toBeInstanceOf(Function);
	});
});

describe('Behavior', () => {
	test('Correctly fills exception properties', () => {
		const error = new IncorrectBeatCountException({
			string: 'Cm7...',
			symbol: 'Cm7',
			duration: 3,
			beatCount: 6,
			beatsPerBar: 4
		});
		expect(error).toBeInstanceOf(IncorrectBeatCountException);
		expect(error.string).toEqual('Cm7...');
		expect(error.symbol).toEqual('Cm7');
		expect(error.duration).toEqual(3);
		expect(error.beatCount).toEqual(6);
		expect(error.beatsPerBar).toEqual(4);
	});
});

describe.each([
	['no string', 'string', 'IncorrectBeatCountException cannot be created without chord string, received: undefined'],
	['no symbol', 'symbol', 'IncorrectBeatCountException cannot be created without chord symbol, received: undefined'],
	['no duration', 'duration', 'IncorrectBeatCountException cannot be created without chord duration, received: undefined'],
	['no beatCount', 'beatCount', 'IncorrectBeatCountException cannot be created without beatCount, received: undefined'],
	['no beatsPerBar', 'beatsPerBar', 'IncorrectBeatCountException cannot be created without beatsPerBar, received: undefined'],
])('Throw TypeError on %s', (title, propertyToRemove, message) => {
	test('Test details', () => {
		const errorParameters = {
			string: 'Cm7...',
			symbol: 'Cm7',
			duration: 3,
			beatCount: 6,
			beatsPerBar: 4
		};
		delete errorParameters[propertyToRemove];

		const throwingFn = () => { throw new IncorrectBeatCountException(errorParameters); };
		expect(throwingFn).toThrow(TypeError);
		expect(throwingFn).toThrow(message);
	});
});
