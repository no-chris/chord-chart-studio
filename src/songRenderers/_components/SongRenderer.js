import './SongRenderer.scss';

import _pick from 'lodash/pick';
import React from 'react';
import PropTypes from 'prop-types';

import escapeHTML from '../../core/escapeHTML';

import renderSong from '../../core/renderSong';

function SongRenderer(props) {
	const { content, chartType } = props;

	const renderOptions = _pick(props, [
		'transposeValue',
		'harmonizeAccidentals',
		'accidentalsType',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
	]);

	return (
		<div className={'songRenderer'}>
			<div
				dangerouslySetInnerHTML={{
					__html: escapeHTML(
						renderSong(content, {
							...renderOptions,
							chordsAndLyricsDisplay: chartType, //fixme
						})
					),
				}}
			/>
		</div>
	);
}

SongRenderer.propTypes = {
	chartType: PropTypes.string.isRequired,
	content: PropTypes.string,
};

SongRenderer.defaultProps = {
	content: '',
};

export default SongRenderer;
