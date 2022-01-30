import './SongRenderer.scss';

import _pick from 'lodash/pick';
import React from 'react';
import PropTypes from 'prop-types';

import escapeHTML from '../../core/escapeHTML';

import { renderAsHtml } from '../../core/renderSong';

function SongRenderer(props) {
	const { content, useChartFormat } = props;

	const renderOptions = _pick(props, [
		'chartFormat',

		'transposeValue',
		'harmonizeAccidentals',
		'accidentalsType',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',
	]);

	const rendered = renderAsHtml(content, renderOptions, useChartFormat);

	return (
		<div className={'songRenderer'}>
			<div
				dangerouslySetInnerHTML={{
					__html: escapeHTML(rendered),
				}}
			/>
		</div>
	);
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
