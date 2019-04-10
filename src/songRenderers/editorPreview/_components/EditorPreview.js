import './EditorPreview.scss';

import React from 'react';

import SongRenderer from '../../_containers/SongRenderer';

export default function EditorPreview(props) {
	const { selectedFile } = props;

	return (
		<div className={'ep-SongRenderer'}>
			<SongRenderer content={selectedFile.content} />
		</div>
	);
}

