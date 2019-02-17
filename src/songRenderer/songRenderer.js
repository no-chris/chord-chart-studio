export default function songRendererFactory(songTab) {
	const originalTab = songTab;

	const beatsPerBar = 4;

	return {

		render() {
			const allChords = originalTab.split(' ');
			const allBars = [];

			let bar = [];
			let chord;
			let beatsCount = 0;

			allChords.forEach(chordString => {
				chord = {
					duration: ((chordString.match(/\./g) || []).length) || beatsPerBar,
					symbol: chordString.replace(/\./g, '')
				};
				beatsCount += chord.duration;

				bar.push(chord);

				if (beatsCount === beatsPerBar) {
					allBars.push(bar.slice());
					bar = [];
					beatsCount = 0;
				}
			});


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
