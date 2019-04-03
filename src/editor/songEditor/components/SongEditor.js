import React from 'react';
import _throttle from 'lodash/throttle';

import ProseMirrorEditorView from '../prosemirror/ProsemirrorEditorView';

export default function SongEditor(props) {
	const { selectedFile } = props;

	function handleEditorChange(fileKey, newContent) {
		props.updateFileContent(fileKey, newContent);
	}

	return (
		<ProseMirrorEditorView
			editorContent={selectedFile.content}
			onEditorChange={_throttle(handleEditorChange, 1000)}
			selectedFileKey={selectedFile.key}
		/>
	);
}
