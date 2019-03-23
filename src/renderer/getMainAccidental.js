export default function getMainAccidental(allChords) {
	let rootNote = '';
	let flatCount = 0;
	let sharpCount = 0;

	allChords.forEach(chord => {
		rootNote = chord.symbol.rootNote;

		if (rootNote.length === 2) {
			let accidental = rootNote[1];

			if (accidental === 'b') {
				flatCount++;
			} else if (accidental === '#') {
				sharpCount++;
			}
		}
	});

	return (flatCount > sharpCount) ? 'flat' : 'sharp';
}