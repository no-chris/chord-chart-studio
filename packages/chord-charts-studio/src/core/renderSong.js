import { renderSong as renderSongCm, parseSong } from 'chord-mark';
import chordMark2ChordPro from 'chord-mark-2-chordpro';

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

function render(songTxt, renderOptions, useChartFormat, outputFormat) {
	if (useChartFormat && renderOptions.chartFormat === 'chordmarkSrc') {
		return outputFormat === 'html' ? toHtml(songTxt) : songTxt;
	} else if (useChartFormat && renderOptions.chartFormat === 'chordpro') {
		renderOptions.customRenderer = chordMark2ChordPro;
		const chordProTxt = renderSong(songTxt, renderOptions);
		return outputFormat === 'html' ? toHtml(chordProTxt) : chordProTxt;
	} else {
		const chordMarkHtml = renderSong(songTxt, renderOptions);
		return outputFormat === 'html' ? chordMarkHtml : toText(chordMarkHtml);
	}
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
		.map((line) => `<p>${line}</p>`)
		.join('');
}

function toText(html) {
	const allLines = html.match(/(<p.*?>.*?<\/p>)/gm);

	return allLines
		.map((line) => stripTags(line))
		.map((line) => (line === '&nbsp;' ? '' : line))
		.join('\n');
}
