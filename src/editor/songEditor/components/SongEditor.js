import React from 'react';
import { connect } from 'react-redux';
import _throttle from 'lodash/throttle';

import { getSelectedFile } from '../../../fileManager/selectors';
import { updateFileContent } from '../../../fileManager/actions';

import ProseMirrorEditorView from '../prosemirror/ProsemirrorEditorView';

export default connect(
	state => ({
		selectedFile: getSelectedFile(state)
	}),
	{
		updateFileContent
	}
)(function SongEditor(props) {
	const { selectedFile } = props;
	const editorContent = (selectedFile.content) ? selectedFile.content : '';

	function handleEditorChange(fileKey, newContent) {
		props.updateFileContent(fileKey, newContent);
	}

	return (
		<div className="song-editor">
			<div className="song-editor-source">
				<ProseMirrorEditorView
					editorContent={editorContent}
					onEditorChange={_throttle(handleEditorChange, 1000)}
					selectedFileKey={selectedFile.key}
				/>
			</div>
			<div className="song-editor-preview">
				Preview
			</div>
		</div>
	);
});
