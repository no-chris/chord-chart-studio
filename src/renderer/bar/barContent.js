import _ from 'lodash';

import isRenderer from '../isRenderer';

import barContentTpl from './barContent.hbs';

const defaultSpaceCount = 2;

export default {
	render(bar, { chordRenderer } = {}) {
		let spacesAfter = 0;

		if (! isRenderer(chordRenderer)) {
			throw new TypeError('chordRenderer is not a valid renderer');
		}

		const barContent = bar.allChords.reduce((rendering, chord) => {
			spacesAfter = _.isFinite(chord.spacesAfter) ? chord.spacesAfter : defaultSpaceCount;

			rendering +=
				chordRenderer.render(chord.symbol) +
				' '.repeat(spacesAfter);

			return rendering;
		}, '');

		return barContentTpl({ barContent });
	}
};
