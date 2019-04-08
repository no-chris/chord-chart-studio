import React from 'react';

import SongRenderer from '../../_containers/SongRenderer';

export default function EditorPreview(props) {
	const { selectedFile } = props;

	return (
		<div className="pp">
			<div className="pp-page">
				<SongRenderer content={selectedFile.content} />
			</div>
		</div>
	);
}

