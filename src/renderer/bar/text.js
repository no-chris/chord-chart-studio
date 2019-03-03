import _ from 'lodash';
const defaultSpaceCount = 2;

export default {
	render(bar) {
		let spacesAfter = 0;

		return bar.allChords.reduce((rendering, chord) => {
			spacesAfter = _.isFinite(chord.spacesAfter) ? chord.spacesAfter : defaultSpaceCount;

			rendering +=
				chord.symbol +
				' '.repeat(spacesAfter);

			return rendering;
		}, '');
	}
};