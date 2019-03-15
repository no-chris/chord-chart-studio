import isTimeSignatureString from './isTimeSignatureString';

export default function getTimeSignature(string) {
	if (!isTimeSignatureString(string)) {
		throw new TypeError('Expected time signature string, received: ' + string);
	}

	const array = string.split('/');

	const count = Number.parseInt(array[0], 10);
	const value = Number.parseInt(array[1], 10);

	let beatCount = count;

	if (value === 2) {
		beatCount = count * 2;

	} else if (value === 8) {
		beatCount = count / 3;
	}

	return {
		string,
		count,
		value,
		beatCount,
	};
}

