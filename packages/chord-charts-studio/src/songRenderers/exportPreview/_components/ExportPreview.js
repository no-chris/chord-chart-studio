import './ExportPreview.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function ExportPreview(props) {
	const { selectedFile } = props;

	return (
		<div className={'exportPreview exp-SongRenderer cmTheme-text'}>
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
