import IncorrectBeatCountException from './exceptions/IncorrectBeatCountException';

export default function songRendererFactory(
	songTab,
	{
		beatsPerBar = 4
	} = {}
) {
	const originalTab = songTab;

	const allChords = originalTab.split(' ');
	const allBars = [];

	let bar = [];
	let chord;
	let beatsCount = 0;

	allChords.forEach(chordString => {
		chord = {
			string: chordString,
			duration: ((chordString.match(/\./g) || []).length) || beatsPerBar,
			symbol: chordString.replace(/\./g, '')
		};
		beatsCount += chord.duration;

		bar.push(chord);

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

		render() {

			const lineString = allBars
				.map(currentBar => currentBar
					.map(chord => chord.symbol)
					.join(' ')
				)
				.join(' | ');

			return '| ' + lineString + ' |';
		},


		toString() {
			return this.render();
		}
	};
}
