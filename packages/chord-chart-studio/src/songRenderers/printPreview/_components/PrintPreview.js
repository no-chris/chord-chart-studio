import './PrintPreview.scss';

import _pick from 'lodash/pick';
import React from 'react';
import PropTypes from 'prop-types';

import { renderAsHtml } from '../../../core/renderSong';
import AllPages from './AllPages';

function PrintPreview(props) {
	const { selectedFile } = props;

	const renderOptions = _pick(props, [
		'transposeValue',
		'accidentalsType',
		'symbolType',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',
	]);

	const rendered = renderAsHtml(selectedFile.content || '', {
		...renderOptions,
	});
	const allLines = rendered.match(/(<p.*?>.*?<\/p>)/gm);

	const classNames = ['printPreview', 'cmTheme-print'];

	return (
		<div className={classNames.join(' ')} data-testid={'printPreview'}>
			<AllPages
				title={selectedFile.title || ''}
				allLines={allLines}
				columnsCount={props.columnsCount}
				columnBreakOnSection={props.columnBreakOnSection}
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
	columnBreakOnSection: PropTypes.bool.isRequired,
	documentSize: PropTypes.string,
	documentMargins: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
};

export default PrintPreview;
