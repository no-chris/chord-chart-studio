import isTimeSignatureString from './isTimeSignatureString';

export default function getTimeSignatureDefinition(tsString) {
	if (!isTimeSignatureString(tsString)) {
		throw new TypeError('Expected time signature string, received: ' + tsString);
	}

	const array = tsString.split('/');

	const tsCount = Number.parseInt(array[0], 10);
	const tsValue = Number.parseInt(array[1], 10);

	let beatsPerBar = tsCount;

	if (tsValue === 2) {
		beatsPerBar = tsCount * 2;

	} else if (tsValue === 8) {
		beatsPerBar = tsCount / 3;
	}

	return {
		tsCount,
		tsValue,
		beatsPerBar,
	};
}

