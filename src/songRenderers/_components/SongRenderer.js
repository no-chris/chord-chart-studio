import './SongRenderer.scss';

import _pick from 'lodash/pick';
import React from 'react';
import PropTypes from 'prop-types';

import renderSong from '../../core/renderSong';

function SongRenderer(props) {
	const {
		content
	} = props;

	const renderOptions = _pick(props, [
		'alignBars',
		'harmonizeAccidentals',
		'preferredAccidentals',
		'transposeValue'
	]);

	return (
		<div className={'songRenderer'}>
			<div dangerouslySetInnerHTML={{ __html: renderSong(content, renderOptions) }} />
		</div>
	);
}

SongRenderer.propTypes = {
	content: PropTypes.string
};

SongRenderer.defaultProps = {
	content: ''
};

export default SongRenderer;
