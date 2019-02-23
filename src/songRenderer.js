import _ from 'lodash';

import IncorrectBeatCountException from './exceptions/IncorrectBeatCountException';
import ChordsPositionMismatchException from './exceptions/ChordsPositionMismatchException';


function parseChordLine(chordLine, beatsPerBar) {
	const allChords = chordLine.split(' ');
	const allBars = [];

	let bar = [];
	let chord;
	let beatsCount = 0;
	let chordCount = 0;

	allChords.forEach(chordString => {
		chord = {
			string: chordString,
			duration: ((chordString.match(/\./g) || []).length) || beatsPerBar,
			symbol: chordString.replace(/\./g, '')
		};
		beatsCount += chord.duration;

		bar.push(chord);
		chordCount++;

		if (beatsCount === beatsPerBar) {
			allBars.push(bar.slice());
			bar = [];
			beatsCount = 0;

		} else if (beatsCount > beatsPerBar) {
			throw new IncorrectBeatCountException({
				message: '',
				string: chord.string,
				symbol: chord.symbol,
				duration: chord.duration,
				beatCount: beatsCount,
				beatsPerBar: beatsPerBar,
			});
		}
	});

	if (beatsCount > 0 && (beatsCount < beatsPerBar)) {
		throw new IncorrectBeatCountException({
			message: '',
			string: chord.string,
			symbol: chord.symbol,
			duration: chord.duration,
			beatCount: beatsCount,
			beatsPerBar: beatsPerBar,
		});
	}

	return {
		chordCount,
		allBars
	};
}


function getPositionsFromTextbase(textBase) {
	const allExplicitPositions = [];

	const allParts = textBase.split('_');

	let sumOfParts = 0;
	allParts.forEach(part => {
		sumOfParts += part.length;
		allExplicitPositions.push(sumOfParts);
	});

	return allExplicitPositions;
}



function positionChords(forcedPositions, allBars) {

}



export default function songRendererFactory(
	chordLine,
	{
		textBase = '',
		beatsPerBar = 4
	} = {}
) {
	const { chordCount, allBars } = parseChordLine(chordLine, beatsPerBar);

	const forcedPositions = getPositionsFromTextbase(textBase);

	const textBaseLength = textBase.length;
	const positionCount = forcedPositions.length;

	if ((positionCount > 0) && (positionCount !== chordCount)) {
		throw new ChordsPositionMismatchException({
			message: 'test',
			chordCount,
			positionCount
		});
	}

	const textBaseCleaned = textBase.replace(/_/g, '');




	return {

		render() {

			if (textBaseCleaned) {

				const positionnedChords = positionChords(forcedPositions, allBars);

				return '| ' + allBars[0][0].symbol + ' '.repeat(textBaseLength) + '|';

			} else {

				const lineString = allBars
					.map(currentBar => currentBar
						.map(chord => chord.symbol)
						.join(' ')
					)
					.join(' | ');

				return '| ' + lineString + ' |';
			}
		},


		toString() {
			return this.render();
		}
	};
}
