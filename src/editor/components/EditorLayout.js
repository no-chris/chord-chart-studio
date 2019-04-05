import React from 'react';

import SongEditor from '../SongEditor/components/SongEditor';
import EditorPreview from '../editorPreview/components/EditorPreview';

export default function EditorLayout(props) {
	const { selectedFile, updateFile } = props;

	return (
		<div className="song-editor">
			<div className="song-editor-source">
				<SongEditor
					selectedFile={selectedFile}
					updateFile={updateFile}
				/>
			</div>
			<div className="song-editor-preview">
				<EditorPreview
					selectedFile={selectedFile}
				/>
			</div>
		</div>
	);
}

EditorLayout.defaultProps ={
	selectedFile: { content: '' }
};
