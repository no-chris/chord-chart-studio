const spacing = {
	afterBar: 1,
	beforeBar: 1,
	betweenChords: 3
}

const barSymbol = '|';

function wrapInBar(barContent) {
	return barSymbol +
		' '.repeat(spacing.afterBar) +
		barContent +
		' '.repeat(spacing.beforeBar) +
		barSymbol;
}

export default function positionChord(allBars, { textBase = '' } = {}) {

	allBars.forEach(bar => {

	});
}