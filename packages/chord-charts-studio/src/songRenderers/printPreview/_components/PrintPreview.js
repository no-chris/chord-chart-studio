import './PrintPreview.scss';

import _pick from 'lodash/pick';
import React from 'react';
import PropTypes from 'prop-types';

import { renderAsHtml } from '../../../core/renderSong';
import AllPages from './AllPages';

function PrintPreview(props) {
	const { selectedFile, highlightChords } = props;

	const renderOptions = _pick(props, [
		'transposeValue',
		'harmonizeAccidentals',
		'accidentalsType',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',
	]);

	const allLines = renderAsHtml(selectedFile.content || '', {
		...renderOptions,
	}).split('\n');

	const classNames = ['printPreview', 'cmTheme-print'];
	if (highlightChords) {
		classNames.push('cmChordLine--highlightChords');
	}

	return (
		<div className={classNames.join(' ')} data-testid={'printPreview'}>
			<AllPages
				title={selectedFile.title || ''}
				allLines={allLines}
				columnsCount={props.columnsCount}
				columnBreakOnParagraph={props.columnBreakOnParagraph}
				documentSize={props.documentSize || 'a4'}
				documentMargins={props.documentMargins}
				fontSize={props.fontSize}
			/>
		</div>
	);
}
PrintPreview.propTypes = {
	chartType: PropTypes.string.isRequired,
	selectedFile: PropTypes.object.isRequired,
	columnsCount: PropTypes.number.isRequired,
	columnBreakOnParagraph: PropTypes.bool.isRequired,
	documentSize: PropTypes.string,
	documentMargins: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
	highlightChords: PropTypes.bool.isRequired,
};

export default PrintPreview;
