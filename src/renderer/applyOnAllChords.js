import _ from 'lodash';

export default function applyOnAllChords(songLines, fn) {
	const applied = _.cloneDeep(songLines);

	applied.forEach(line => {
		if (line.type === 'chord') {
			line.model.allBars.forEach(bar => {
				bar.allChords.forEach(chord => {
					fn(chord);
				});
			});
		}
	});
	return applied;
}