import './ExportPreview.scss';

import React from 'react';

import SongRenderer from '../../_containers/SongRenderer';

export default function EditorPreview(props) {
	const { selectedFile } = props;

	return (
		<div className={'exportPreview exp-SongRenderer'}>
			<SongRenderer content={selectedFile.content} />
		</div>
	);
}

