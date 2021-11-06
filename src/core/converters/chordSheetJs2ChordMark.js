import { ChordLyricsPair, Tag } from 'chordsheetjs';

const allLines = [];

export default function chordSheetJs2ChordMark(song) {
	allLines.length = 0;
	formatAllParagraphs(song);
	return allLines.join('\n');
}

const formatAllParagraphs = (song) => {
	const { bodyParagraphs } = song;
	bodyParagraphs.map((paragraph) => {
		formatParagraph(paragraph);
		allLines.push('');
	});
};

const formatParagraph = (paragraph) => {
	switch (paragraph.type) {
		case 'verse':
			allLines.push('#v');
			break;
		case 'chorus':
			allLines.push('#c');
			break;
	}
	paragraph.lines.map((line) => formatLine(line));
};

const formatLine = (line) => {
	const parts = [
		formatChordLine(line),
		formatLyricLine(line),
		formatTagLine(line),
	]
		.filter((i) => i !== null)
		.map((part) => part.trimRight());

	allLines.push(...parts);
};

const formatChordLine = (line) => {
	if (!lineHasChords(line)) {
		return null;
	}

	return line.items.reduce((chordLine, item) => {
		if (itemHasChord(item)) {
			chordLine += item.chords.trim() + ' ';
		}
		return chordLine;
	}, '');
};

const formatLyricLine = (line) => {
	if (!lineHasLyrics(line)) {
		return null;
	}
	return line.items.reduce((lyricsLine, item) => {
		if (!itemHasLyric(item)) lyricsLine += ' ';
		if (itemHasChord(item)) lyricsLine += '_';
		if (itemHasLeftPadding(item)) lyricsLine += ' ';

		lyricsLine += item.lyrics.trim();

		if (itemHasRightPadding(item)) lyricsLine += ' ';

		return lyricsLine;
	}, '');
};

const formatTagLine = (line) => {
	if (!lineHasTag(line)) {
		return null;
	}
	const tagValue = line.items[0].value.toLowerCase().replace(/[- 0-9]/g, '');

	return sectionLabelsMapping[tagValue]
		? sectionLabelsMapping[tagValue]
		: '#' + tagValue;
};

const sectionLabelsMapping = {
	adlib: '#a',
	bridge: '#b',
	chorus: '#c',
	interlude: '#u',
	intro: '#i',
	introduction: '#i',
	outro: '#o',
	prechorus: '#p',
	solo: '#s',
};

const lineHasChords = (line) =>
	line.items.some((item) => item instanceof ChordLyricsPair && item.chords);

const lineHasLyrics = (line) =>
	line.items.some((item) => item instanceof ChordLyricsPair && item.lyrics);

const lineHasTag = (line) =>
	line.items.some((item) => item instanceof Tag && item.isRenderable());

const itemHasChord = (item) => {
	return item instanceof ChordLyricsPair && item.chords.trim().length;
};

const itemHasLyric = (item) => {
	return item.lyrics.length;
};

const itemHasLeftPadding = (item) => {
	return item.lyrics.length - item.lyrics.trimLeft().length >= 1;
};

const itemHasRightPadding = (item) => {
	return (
		item.lyrics.trim().length &&
		item.lyrics.length - item.lyrics.trimRight().length >= 1
	);
};
