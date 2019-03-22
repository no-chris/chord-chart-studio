import _ from 'lodash';
import transposeChord from './transposeChord';

export default function transposeSong(songLines, value, useFlats) {
	const transposed = _.cloneDeep(songLines);

	transposed.forEach(line => {
		if (line.type === 'chord') {
			line.model.allBars.forEach(bar => {
				bar.allChords.forEach(chord => {
					chord.transposedModel = transposeChord(chord.model, value, useFlats);
				});
			});
		}
	});
	return transposed;
}