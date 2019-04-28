import './EditorPreview.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function EditorPreview(props) {
	const { selectedFile, chordsColor, highlightChords } = props;

	const classNames = ['ep-SongRenderer'];
	classNames.push('cmChordLine--chordsColor-' + chordsColor);
	if (highlightChords) {
		classNames.push('cmChordLine--highlightChords');
	}

	return (
		<div className={classNames.join(' ')}>
			<SongRenderer content={selectedFile.content} />
		</div>
	);
}

EditorPreview.propTypes = {
	selectedFile: PropTypes.object.isRequired,
	chordsColor: PropTypes.string.isRequired,
	highlightChords: PropTypes.bool.isRequired,
};

export default EditorPreview;
