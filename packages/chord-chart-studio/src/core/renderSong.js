import { renderSong as renderSongCm, parseSong } from 'chord-mark';
import {
	chordMark2ChordPro,
	chordMark2UltimateGuitar,
} from 'chord-mark-converters';
import { chordRendererFactory } from 'chord-symbol';
import chordSymbolUltimateGuitar from 'chord-symbol-ultimateguitar';

import stripTags from './stripTags';

export function renderAsText(
	songTxt,
	renderOptions = {},
	useChartFormat = false
) {
	return render(songTxt, renderOptions, useChartFormat, 'text');
}

export function renderAsHtml(
	songTxt,
	renderOptions = {},
	useChartFormat = false
) {
	return render(songTxt, renderOptions, useChartFormat, 'html');
}

// eslint-disable-next-line complexity
function render(songTxt, renderOptions, useChartFormat, outputFormat) {
	if (useChartFormat) {
		switch (renderOptions.chartFormat) {
			case 'chordmark': {
				const cmHtml = renderSong(songTxt, renderOptions);
				return outputFormat === 'html' ? cmHtml : toText(cmHtml);
			}
			case 'chordmarkSrc':
				return outputFormat === 'html' ? toHtml(songTxt) : songTxt;
			case 'chordpro': {
				renderOptions.customRenderer = chordMark2ChordPro();
				const cpTxt = renderSong(songTxt, renderOptions);
				return outputFormat === 'html' ? toHtml(cpTxt) : cpTxt;
			}
			case 'ultimateGuitar': {
				renderOptions.customRenderer = chordMark2UltimateGuitar();
				const ugTxt =
					renderSong(songTxt, {
						...renderOptions,
						customRenderer: chordMark2UltimateGuitar(),
						printBarSeparators: 'grids',
						printChordsDuration: 'never',
						printSubBeatDelimiters: false,
						printInlineTimeSignatures: false,
						chordSymbolRenderer: chordRendererFactory({
							customFilters: [chordSymbolUltimateGuitar()],
							useShortNamings: true,
							accidentalsType:
								renderOptions.accidentalsType === 'auto'
									? 'original'
									: renderOptions.accidentalsType,
							...renderOptions, // duh!
						}),
					}) +
					'\n\nCreated with Chord Chart Studio (https://chord-chart-studio.netlify.app)';
				return outputFormat === 'html' ? toHtml(ugTxt) : ugTxt;
			}
		}
	}

	const chordMarkHtml = renderSong(songTxt, {
		...renderOptions,
		wrapChordLyricLines: true,
	});
	return outputFormat === 'html' ? chordMarkHtml : toText(chordMarkHtml);
}

function renderSong(songTxt, renderOptions) {
	try {
		const parsed = parseSong(songTxt);
		return renderSongCm(parsed, {
			...renderOptions,
		});
	} catch (e) {
		return e.message;
	}
}

function toHtml(text) {
	return text
		.split('\n')
		.map((line) => (line === '' ? '&nbsp;' : line))
		.map((line) => `<span class="txtLine">${line}</span>`)
		.join('');
}

function toText(html) {
	const allLines = html.match(/(<p.*?>.*?<\/p>)/gm);

	return allLines
		.map((line) => stripTags(line))
		.map((line) => (line === '&nbsp;' ? '' : line))
		.join('\n');
}
