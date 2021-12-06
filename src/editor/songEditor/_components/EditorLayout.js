import './EditorLayout.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { ScrollSync, ScrollSyncNode } from 'scroll-sync-react';

import EditorPreview from '../../../songRenderers/editorPreview/_containers/EditorPreview';
import ProseMirrorEditorView from '../prosemirror/ProsemirrorEditorView';

function EditorLayout(props) {
	const { selectedFile, updateFile } = props;

	return (
		<ScrollSync>
			<div className={'songEditor'}>
				<ScrollSyncNode group={'a'}>
					<div className={'songEditor-source'}>
						<ProseMirrorEditorView
							editorContent={selectedFile.content}
							updateFile={updateFile}
							selectedFileId={selectedFile.id}
						/>
					</div>
				</ScrollSyncNode>
				<ScrollSyncNode group={'a'}>
					<div className={'songEditor-preview'}>
						<EditorPreview selectedFile={selectedFile} />
					</div>
				</ScrollSyncNode>
			</div>
		</ScrollSync>
	);
}

EditorLayout.propTypes = {
	selectedFile: PropTypes.object,
	updateFile: PropTypes.func.isRequired,
};

export default EditorLayout;
