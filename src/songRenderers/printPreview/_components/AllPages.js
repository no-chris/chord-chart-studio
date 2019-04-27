import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Page from './Page';
import PageHeader from './PageHeader';

import mapLinesToColumns from '../helpers/mapLinesToColumns';
import getDimensionsFromDom from '../helpers/getDimensionsFromDom';


function getAllLinesHeight(container) {
	const allLinesHeight = [];
	container.querySelectorAll('.ucc-line').forEach(line => {
		allLinesHeight.push(line.offsetHeight);
	});
	return allLinesHeight;
}


function getPagesHeight(container) {
	const pageContent = container.querySelector('.printPreview-pageContent');
	const pageColumnWrapper = container.querySelector('.printPreview-pageColumnWrapper');
	return {
		firstPageHeight: pageColumnWrapper.clientHeight,
		normalPageHeight: pageContent.clientHeight,
	};
}


// make sure we always have the correct number of columns by adding empty ones if needed
function padColumns(columnCount, allColumns = []) {
	for (let i = 0; i < columnCount; i++) {
		if (!allColumns[i]) {
			allColumns.push([]);
		}
	}
	return allColumns;
}


function AllPages(props) {
	const [ allPagesColumns, setAllPagesColumns ] = useState([]);

	const {
		title,
		allLines,
		columnsCount,
		columnBreakOnParagraph,
		documentSize,
		documentMargins,
		printFontSize,
	} = props;

	useEffect(() => {
		const getDimensions = async () => {
			// first, render all lines in a column of the expected width to compute height for each individual line
			const allLinesHeight = await getDimensionsFromDom(
				<Page
					allColumnsLines={padColumns(columnsCount, [allLines])}
					columnsCount={columnsCount}
					documentSize={documentSize}
					documentMargins={documentMargins}
					printFontSize={printFontSize}
				/>,
				getAllLinesHeight
			);

			// then get available height in both first and subsequent pages
			const { normalPageHeight, firstPageHeight } = await getDimensionsFromDom(
				<Page
					pageHeader={<PageHeader title={title} />}
					allColumnsLines={padColumns(columnsCount)}
					documentSize={documentSize}
					documentMargins={documentMargins}
					printFontSize={printFontSize}
				/>,
				getPagesHeight
			);

			const allLinesWithHeight = allLines.map((line, index) => ({
				content: line,
				height: allLinesHeight[index]
			}));

			const mapped = mapLinesToColumns(allLinesWithHeight, {
				columnsCount,
				columnBreakOnParagraph,
				normalPageHeight,
				firstPageHeight,
			});
			setAllPagesColumns(mapped);
		};
		getDimensions();
	}, [allLines, columnsCount, columnBreakOnParagraph, title, documentSize, documentMargins, printFontSize]);

	const allPagesRendered = allPagesColumns.map((pageColumns, index) => {
		return <Page
			key={index}
			pageHeader={(index === 0) ? <PageHeader title={title} /> : null}
			allColumnsLines={padColumns(columnsCount, pageColumns)}
			documentSize={documentSize}
			documentMargins={documentMargins}
			printFontSize={printFontSize}
		/>;
	});

	return (
		<React.Fragment>
			{allPagesRendered}
		</React.Fragment>
	);
}

AllPages.propTypes = {
	title: PropTypes.string.isRequired,
	allLines: PropTypes.arrayOf(PropTypes.string).isRequired,
	columnsCount: PropTypes.number.isRequired,
	columnBreakOnParagraph: PropTypes.bool.isRequired,
	documentSize: PropTypes.string.isRequired,
	documentMargins: PropTypes.number.isRequired,
	printFontSize: PropTypes.number.isRequired,
};

export default AllPages;
