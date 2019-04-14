import './PrintPreview.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function PrintPreview(props) {
	const { selectedFile } = props;

	return (
		<div className={'printPreview'}>
			<div className={'printPreview-page pp-SongRenderer'}>
				<SongRenderer content={selectedFile.content} />
			</div>
		</div>
	);
}

PrintPreview.propTypes = {
	selectedFile: PropTypes.object.isRequired,
};

export default PrintPreview;
