import _ from 'lodash';

export function forEachChordInSong(songLines, fn) {
	const newSongLines = _.cloneDeep(songLines);

	newSongLines.forEach(line => {
		if (line.type === 'chord') {
			line.model.allBars.forEach(bar => {
				bar.allChords.forEach(chord => {
					fn(chord);
				});
			});
		}
	});
	return newSongLines;
}

export function forEachChordInChordLine(chordLine, fn) {
	const newChordLine = _.cloneDeep(chordLine);

	newChordLine.allBars.forEach(bar => {
		bar.allChords.forEach(chord => {
			fn(chord);
		});
	});

	return newChordLine;
}