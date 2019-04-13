import './EditorLayout.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongEditor from './SongEditor';
import EditorPreview from '../../../songRenderers/editorPreview/_components/EditorPreview';

function EditorLayout(props) {
	const { selectedFile, updateFile } = props;

	return (
		<div className={'songEditor'}>
			<div className={'songEditor-source'}>
				<SongEditor
					selectedFile={selectedFile}
					updateFile={updateFile}
				/>
			</div>
			<div className={'songEditor-preview'}>
				<EditorPreview
					selectedFile={selectedFile}
				/>
			</div>
		</div>
	);
}

EditorLayout.propTypes = {
	selectedFile: PropTypes.object,
	updateFile: PropTypes.func.isRequired,
};

export default EditorLayout;
