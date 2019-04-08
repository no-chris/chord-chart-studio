import _pick from 'lodash/pick';
import React from 'react';

import renderSong from '../../core/renderSong';

export default function SongRenderer(props) {
	const {
		content
	} = props;

	const renderOptions = _pick(props, [
		'alignBars',
		'harmonizeAccidentals',
		'preferredAccidentals',
		'transposeValue'
	]);

	const renderedSong = (content) ? renderSong(content, renderOptions) : ''; // todo: make the lib resilient to this!

	return (
		<div className="song-renderer">
			<div dangerouslySetInnerHTML={{ __html: renderedSong }} />
		</div>
	);
}
