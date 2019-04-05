import React from 'react';

import renderSong from '../../../core/renderSong';

function EditorPreview(props) {
	const { selectedFile } = props;

	return (
		<div dangerouslySetInnerHTML={{ __html: renderSong(selectedFile.content) }} />
	);
}

EditorPreview.defaultProps = {
	selectedFile: { content: 'YES' } //todo: wtf ?
};

export default EditorPreview;
