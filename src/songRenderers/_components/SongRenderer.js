import './SongRenderer.scss';

import _pick from 'lodash/pick';
import React from 'react';
import PropTypes from 'prop-types';

import escapeHTML from '../../core/escapeHTML';

import renderSong, { renderSongAsChordPro } from '../../core/renderSong';

function SongRenderer(props) {
	const { content, useChartFormat } = props;

	const renderOptions = _pick(props, [
		'transposeValue',
		'harmonizeAccidentals',
		'accidentalsType',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
	]);

	let rendered;

	if (useChartFormat && props.chartFormat === 'chordpro') {
		const songRendered = renderSongAsChordPro(content, renderOptions);
		rendered = <TxtRenderer txt={songRendered} />;
	} else if (useChartFormat && props.chartFormat === 'chordmarkSrc') {
		rendered = <TxtRenderer txt={content} />;
	} else {
		const songRendered = renderSong(content, renderOptions);
		rendered = (
			<div
				dangerouslySetInnerHTML={{
					__html: escapeHTML(songRendered),
				}}
			/>
		);
	}

	return <div className={'songRenderer'}>{rendered}</div>;
}

SongRenderer.propTypes = {
	useChartFormat: PropTypes.bool.isRequired,
	chartFormat: PropTypes.string.isRequired,
	content: PropTypes.string,
};

SongRenderer.defaultProps = {
	content: '',
	useChartFormat: false,
};

export default SongRenderer;

const TxtRenderer = ({ txt }) => {
	return txt
		.split('\n')
		.map((line) => (line === '' ? '\u00A0' : line)) // '\u00A0' => &nbsp;
		.map((line, i) => <p key={i}>{line}</p>);
};
