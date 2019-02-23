export default class ChordsPositionMismatchException extends Error {
	constructor(
		{
			message = 'removeMeAtSomePoint',
			chordCount = 0,
			positionCount = 0,
		} = {}
	) {
		super(message);
		this.name = 'ChordsPositionMismatchException';

		if (!message) {
			throw new TypeError('COVER ME');
		}
		this.chordCount = chordCount;
		this.positionCount = positionCount;
	}
}

