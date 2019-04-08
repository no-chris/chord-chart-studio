import React from 'react';

import ProseMirrorEditorView from '../prosemirror/ProsemirrorEditorView';

export default function SongEditor(props) {
	const { selectedFile, updateFile } = props;

	function handleEditorChange(fileId, newContent) {
		updateFile(fileId, {
			content: newContent
		});
	}

	return (
		<ProseMirrorEditorView
			editorContent={selectedFile.content}
			onEditorChange={handleEditorChange}
			selectedFileId={selectedFile.id}
		/>
	);
}
