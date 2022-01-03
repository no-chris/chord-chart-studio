import './ExportPreview.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function ExportPreview(props) {
	const { selectedFile } = props;

	const exportPreviewRef = React.createRef();

	const selectAll = (e) => {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
			e.preventDefault();
			window.getSelection().selectAllChildren(exportPreviewRef.current);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', selectAll);
		return () => {
			window.removeEventListener('keydown', selectAll);
		};
	});

	return (
		<div
			className={'exportPreview exp-SongRenderer'}
			ref={exportPreviewRef}
		>
			<SongRenderer
				content={selectedFile.content}
				useChartFormat={true}
			/>
		</div>
	);
}

ExportPreview.propTypes = {
	selectedFile: PropTypes.object.isRequired,
};

export default ExportPreview;
