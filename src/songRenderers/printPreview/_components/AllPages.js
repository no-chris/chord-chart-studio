import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Page from './Page';

import mapLinesToColumns from '../helpers/mapLinesToColumns';
import getDimensionsFromDom from '../helpers/getDimensionsFromDom';


function getAllLinesHeight(container) {
	const allLinesHeight = [];
	container.querySelectorAll('.ucc-line').forEach(line => {
		allLinesHeight.push(line.offsetHeight);
	});
	return allLinesHeight;
}


function getPageHeight(container) {
	const pageContent = container.querySelector('.printPreview-pageColumn');
	return pageContent.clientHeight;
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

	const { allLines, columnsCount, columnBreakOnParagraph } = props;

	useEffect(() => {
		const getDimensions = async () => {
			// first, render all lines in a column of the expected width to compute height for each individual line
			const allLinesHeight = await getDimensionsFromDom(
				<Page
					allColumnsLines={padColumns(columnsCount, [allLines])}
					columnsCount={columnsCount}
				/>,
				getAllLinesHeight
			);

			// then get available height in a normal empty
			const normalPageHeight = await getDimensionsFromDom(
				<Page
					allColumnsLines={padColumns(columnsCount)}
				/>,
				getPageHeight
			);

			const dimensions = {
				normalPageHeight,
				allLinesHeight,
			};
			setAllPagesColumns(mapLinesToColumns(allLines, columnsCount, dimensions));
		};
		getDimensions();
	}, [allLines, columnsCount]);

	const allPagesRendered = allPagesColumns.map((pageColumns, index) => {
		return <Page key={index} allColumnsLines={padColumns(columnsCount, pageColumns)} />;
	});

	return (
		<React.Fragment>
			{allPagesRendered}
		</React.Fragment>
	);
}

AllPages.propTypes = {
	allLines: PropTypes.arrayOf(
		PropTypes.objectOf({
			content: PropTypes.string
		})
	).isRequired,
	columnsCount: PropTypes.number.isRequired,
	columnBreakOnParagraph: PropTypes.bool.isRequired,
};

export default AllPages;
