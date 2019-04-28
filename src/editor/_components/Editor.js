import React from 'react';
import PropTypes from 'prop-types';

import EditorLayout from '../songEditor/_components/EditorLayout';
import ExportPreview from '../../songRenderers/exportPreview/_components/ExportPreview';
import PlayRenderer from '../../songRenderers/playRenderer/_components/PlayRenderer';
import PrintPreview from '../../songRenderers/printPreview/_containers/PrintPreview';

function Editor(props) {
	const { editorMode } = props;

	switch (editorMode) {
		case 'edit': return <EditorLayout {...props} />;
		case 'play': return <PlayRenderer {...props} />;
		case 'print': return <PrintPreview {...props} />;
		case 'export': return <ExportPreview {...props} />;
	}
}

Editor.propTypes = {
	editorMode: PropTypes.string.isRequired,
};

export default Editor;
