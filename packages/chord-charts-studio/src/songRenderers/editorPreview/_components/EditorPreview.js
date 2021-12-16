import './EditorPreview.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function EditorPreview(props) {
	const { selectedFile, theme } = props;

	const classNames = [
		'editorPreview',
		'cmTheme-' + theme,
		'cmTheme-fadeRepeats',
	];

	return (
		<div className={classNames.join(' ')}>
			<SongRenderer content={selectedFile.content} />
		</div>
	);
}

EditorPreview.propTypes = {
	theme: PropTypes.string.isRequired,
	selectedFile: PropTypes.object.isRequired,
};

export default EditorPreview;
