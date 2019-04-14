import './EditorPreview.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function EditorPreview(props) {
	const { selectedFile } = props;

	return (
		<div className={'ep-SongRenderer'}>
			<SongRenderer content={selectedFile.content} />
		</div>
	);
}

EditorPreview.propTypes = {
	selectedFile: PropTypes.object.isRequired,
};

export default EditorPreview;
