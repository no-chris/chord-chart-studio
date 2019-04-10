import './PrintPreview.scss';

import React from 'react';

import SongRenderer from '../../_containers/SongRenderer';

export default function EditorPreview(props) {
	const { selectedFile } = props;

	return (
		<div className="printPreview">
			<div className="printPreview-page pp-SongRenderer">
				<SongRenderer content={selectedFile.content} />
			</div>
		</div>
	);
}

