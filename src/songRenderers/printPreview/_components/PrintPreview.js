import './PrintPreview.scss';

import _pick from 'lodash/pick';
import React from 'react';
import PropTypes from 'prop-types';

import renderSong from '../../../core/renderSong';
import AllPages from './AllPages';


function PrintPreview(props) {
	const { selectedFile, highlightChords } = props;

	const renderOptions = _pick(props, [
		'alignChordsWithLyrics',
		'alignBars',
		'harmonizeAccidentals',
		'accidentalsType',
		'transposeValue',
		'autoRepeatChords',
		'expandSectionRepeats',
		'useShortNamings',
		'simplifyChords',
	]);

	const allLines = renderSong(selectedFile.content || '', renderOptions).split('\n');

	const classNames = ['printPreview'];
	if (highlightChords) {
		classNames.push('cmChordLine--highlightChords');
	}

	return (
		<div className={classNames.join(' ')} data-testid={'printPreview'}>
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
	highlightChords: PropTypes.bool.isRequired,
};

export default PrintPreview;

