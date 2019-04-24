import './PrintPreview.scss';

import _pick from 'lodash/pick';
import React from 'react';
import PropTypes from 'prop-types';

import renderSong from '../../../core/renderSong';
import AllPages from './AllPages';


function PrintPreview(props) {
	const { selectedFile } = props;

	const renderOptions = _pick(props, [
		'alignBars',
		'harmonizeAccidentals',
		'accidentalsType',
		'transposeValue'
	]);

	const allLines = renderSong(selectedFile.content, renderOptions)
		.split('\n')
		.map(line => ({ content: line }));

	return (
		<div className={'printPreview'}>
			<AllPages
				allLines={allLines}
				columnsCount={props.columnsCount}
				columnBreakOnParagraph={props.columnBreakOnParagraph}
			/>
		</div>
	);
}
PrintPreview.propTypes = {
	selectedFile: PropTypes.object.isRequired,
	columnsCount: PropTypes.number.isRequired,
	columnBreakOnParagraph: PropTypes.bool.isRequired,
};

export default PrintPreview;

