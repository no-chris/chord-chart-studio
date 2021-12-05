import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import Page from './Page';
import PageHeader from './PageHeader';

import mapLinesToColumns from '../helpers/mapLinesToColumns';
import getAllLinesHeight from '../helpers/getAllLinesHeight';
import getPagesHeight from '../helpers/getPagesHeight';
import padColumns from '../helpers/padColumns';

function AllPages(props) {
	const [allPagesColumns, setAllPagesColumns] = useState([]);

	const {
		title,
		allLines,
		columnsCount,
		columnBreakOnParagraph,
		documentSize,
		documentMargins,
		fontSize,
	} = props;

	useLayoutEffect(() => {
		const getDimensions = async () => {
			const pageOptions = {
				columnsCount,
				documentSize,
				documentMargins,
				fontSize,
			};

			const allLinesHeight = await getAllLinesHeight(
				allLines,
				pageOptions
			);

			const { normalPageHeight, firstPageHeight } = await getPagesHeight(
				title,
				pageOptions
			);

			const allLinesWithHeight = allLines.map((line, index) => ({
				content: line,
				height: allLinesHeight[index],
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
	}, [
		allLines,
		title,
		columnsCount,
		columnBreakOnParagraph,
		documentSize,
		documentMargins,
		fontSize,
	]);

	const allPagesRendered = allPagesColumns.map((pageColumns, index) => {
		return (
			<Page
				key={index}
				pageHeader={index === 0 ? <PageHeader title={title} /> : null}
				allColumnsLines={padColumns(columnsCount, pageColumns)}
				documentSize={documentSize}
				documentMargins={documentMargins}
				fontSize={fontSize}
			/>
		);
	});

	return <React.Fragment>{allPagesRendered}</React.Fragment>;
}

AllPages.propTypes = {
	title: PropTypes.string.isRequired,
	allLines: PropTypes.arrayOf(PropTypes.string).isRequired,
	columnsCount: PropTypes.number.isRequired,
	columnBreakOnParagraph: PropTypes.bool.isRequired,
	documentSize: PropTypes.string.isRequired,
	documentMargins: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
};

export default AllPages;
