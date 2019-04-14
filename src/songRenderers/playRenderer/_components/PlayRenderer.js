import './PlayRenderer.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function PlayRenderer(props) {
	const { selectedFile } = props;

	return (
		<div className={'playRenderer pr-SongRenderer'}>
			<SongRenderer content={selectedFile.content} />
		</div>
	);
}

PlayRenderer.propTypes = {
	selectedFile: PropTypes.object.isRequired,
};

export default PlayRenderer;
