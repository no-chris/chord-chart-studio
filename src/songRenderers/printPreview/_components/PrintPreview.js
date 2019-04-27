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
		'transposeValue',
	]);

	const allLines = renderSong(selectedFile.content, renderOptions).split('\n');

	return (
		<div className={'printPreview'}>
			<AllPages
				title={selectedFile.title}
				allLines={allLines}
				columnsCount={props.columnsCount}
				columnBreakOnParagraph={props.columnBreakOnParagraph}
				documentSize={props.documentSize}
				documentMargins={props.documentMargins}
				printFontSize={props.printFontSize}
			/>
		</div>
	);
}
PrintPreview.propTypes = {
	selectedFile: PropTypes.object.isRequired,
	columnsCount: PropTypes.number.isRequired,
	columnBreakOnParagraph: PropTypes.bool.isRequired,
	documentSize: PropTypes.string.isRequired,
	documentMargins: PropTypes.number.isRequired,
	printFontSize: PropTypes.number.isRequired,
};

export default PrintPreview;

