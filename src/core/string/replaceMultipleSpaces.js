export default function replaceMultipleSpaces(input, replaceWith = ' ') {
	return input.replace(/  +/g, replaceWith);
}