import './EditorPreview.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function EditorPreview(props) {
	const { selectedFile } = props;

	const classNames = ['editorPreview'];

	return (
		<div className={classNames.join(' ')}>
			<SongRenderer content={selectedFile.content} />
		</div>
	);
}

EditorPreview.propTypes = {
	selectedFile: PropTypes.object.isRequired,
};

export default EditorPreview;
