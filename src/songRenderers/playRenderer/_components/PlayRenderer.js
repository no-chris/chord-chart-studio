import React from 'react';

import SongRenderer from '../../_containers/SongRenderer';

export default function EditorPreview(props) {
	const { selectedFile } = props;

	return (
		<SongRenderer content={selectedFile.content} />
	);
}

