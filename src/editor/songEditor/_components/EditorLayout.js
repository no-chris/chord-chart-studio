import './EditorLayout.scss';

import React from 'react';
import PropTypes from 'prop-types';

import EditorPreview from '../../../songRenderers/editorPreview/_containers/EditorPreview';
import ProseMirrorEditorView from '../prosemirror/ProsemirrorEditorView';

function EditorLayout(props) {
	const { selectedFile, updateFile } = props;

	return (
		<div className={'songEditor'}>
			<div className={'songEditor-source'}>
				<ProseMirrorEditorView
					editorContent={selectedFile.content}
					updateFile={updateFile}
					selectedFileId={selectedFile.id}
				/>
			</div>
			<div className={'songEditor-preview'}>
				<EditorPreview selectedFile={selectedFile} />
			</div>
		</div>
	);
}

EditorLayout.propTypes = {
	selectedFile: PropTypes.object,
	updateFile: PropTypes.func.isRequired,
};

export default EditorLayout;
