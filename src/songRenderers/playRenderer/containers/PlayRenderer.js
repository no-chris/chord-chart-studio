import React from 'react';
import { connect } from 'react-redux';

import { getSelectedFile } from '../../../fileManager/selectors';

import renderSong from '../../../core/renderSong';

export default connect(
	state => ({
		selectedFile: getSelectedFile(state)
	}),

	{}

)(function SongRenderer(props) {
	const { selectedFile } = props;

	const renderedSong = (selectedFile.content) ? renderSong(selectedFile.content) : '';

	return (
		<div className="song-renderer">
			<div dangerouslySetInnerHTML={{ __html: renderedSong }} />
		</div>
	);
});
