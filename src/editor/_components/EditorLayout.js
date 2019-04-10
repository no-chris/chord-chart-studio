import './EditorLayout.scss';

import React from 'react';

import SongEditor from '../songEditor/_components/SongEditor';
import EditorPreview from '../../songRenderers/editorPreview/_components/EditorPreview';

export default function EditorLayout(props) {
	const { selectedFile, updateFile } = props;

	return (
		<div className="songEditor">
			<div className="songEditor-source">
				<SongEditor
					selectedFile={selectedFile}
					updateFile={updateFile}
				/>
			</div>
			<div className="songEditor-preview">
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
