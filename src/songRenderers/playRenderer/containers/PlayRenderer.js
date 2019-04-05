import React from 'react';
import { connect } from 'react-redux';

import { getSelectedId } from '../../../fileManager/selectors';
import { getOne } from '../../../db/files/selectors';

import renderSong from '../../../core/renderSong';

export default connect(
	state => ({
		selectedFile: getOne(state, getSelectedId(state))
	}),

	{}

)(function SongRenderer(props) {
	const { selectedFile = {} } = props; //todo fix this

	const renderedSong = (selectedFile.content) ? renderSong(selectedFile.content) : '';

	return (
		<div className="song-renderer">
			<div dangerouslySetInnerHTML={{ __html: renderedSong }} />
		</div>
	);
});
