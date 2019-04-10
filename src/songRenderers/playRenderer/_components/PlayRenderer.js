import './PlayRenderer.scss';

import React from 'react';

import SongRenderer from '../../_containers/SongRenderer';

export default function EditorPreview(props) {
	const { selectedFile } = props;

	return (
		<div className={'playRenderer pr-SongRenderer'}>
			<SongRenderer content={selectedFile.content} />
		</div>
	);
}

