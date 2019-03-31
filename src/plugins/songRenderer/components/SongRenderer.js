import React from 'react';
import { connect } from 'react-redux';

import {
	getOpenedSong,
	openSong
} from '../state';

import renderSong from '../services/renderSong';

export default connect(
	state => ({
		openedSong: getOpenedSong(state),
	}),

	dispatch => ({
		_openSong: openSong.bind(null, dispatch),
	})

)(function SongRenderer(props) {
	const {
		openedSong
	} = props;

	return (
		<div className="song-renderer">
			<div dangerouslySetInnerHTML={{ __html: renderSong(openedSong) }} />
		</div>
	);
});
