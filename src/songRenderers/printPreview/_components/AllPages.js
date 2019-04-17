import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Page from './Page';


function getDomDimension(Component, props, measuringFn) {
	const container = document.createElement('div');
	container.classList.add('.measuring-node');
	document.body.appendChild(container);

	return new Promise(resolve => {
		ReactDOM.render(<Component {...props} />, container, () => {

			const measure = measuringFn(container);

			ReactDOM.unmountComponentAtNode(container);
			container.parentNode.removeChild(container);

			resolve(measure);
		});
	});
}


function getAllLinesHeight(container) {
	const allLinesHeight = [];
	container.querySelectorAll('.ucc-line').forEach(line => {
		allLinesHeight.push(getOuterHeight(line));
	});
	return allLinesHeight;
}


function getOuterHeight(el) {
	let height = el.offsetHeight;
	const style = getComputedStyle(el);

	height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	return height;
}


function getPageHeight(container) {
	const pageContent = container.querySelector('.printPreview-pageColumn');
	return pageContent.clientHeight;
}

function splitAllLinesInParts(allLines, allLinesHeight, pageHeight) {
	const songParts = [];

	if (pageHeight > 0) {
		let currentPartHeight = 0;
		let partIndex = 0;

		songParts[partIndex] = [];

		allLinesHeight.forEach((lineHeight, index) => {
			currentPartHeight += lineHeight;
			if (currentPartHeight > pageHeight) {
				currentPartHeight = lineHeight;
				partIndex++;
				songParts[partIndex] = [];
			}
			songParts[partIndex].push(allLines[index]);
		});
	}

	return songParts;
}

function mapPartsToPageColumns(songParts, columnsCount) {
	const allPagesColumns = [];

	let columnIndex = 0;
	let pageIndex = 0;

	allPagesColumns[pageIndex] = [];

	songParts.forEach(part => {
		if (columnIndex === columnsCount) {
			columnIndex = 0;
			pageIndex++;
			allPagesColumns[pageIndex] = [];
		}
		allPagesColumns[pageIndex].push(part);
		columnIndex++;
	});

	return allPagesColumns;
}

function AllPages(props) {
	const [ allLinesHeight, setAllLinesHeight ] = useState([]);
	const [ pageHeight, setPageHeight ] = useState(0);

	const { allLines, columnsCount, columnBreakOnParagraph } = props;

	let allPagesColumns = [];

	if (pageHeight > 0) {
		const songParts = splitAllLinesInParts(allLines, allLinesHeight, pageHeight);
		allPagesColumns = mapPartsToPageColumns(songParts, columnsCount);
	}

	useEffect(() => {
		const getDimensions = async () => {
			const linesHeight = await getDomDimension(Page, { allColumnsLines: [allLines, []], columnsCount }, getAllLinesHeight);
			const pHeight = await getDomDimension(Page, { allColumnsLines: [[], []] } , getPageHeight);
			setAllLinesHeight(linesHeight);
			setPageHeight(pHeight);
		};
		getDimensions();
	}, [allLines, columnsCount]);

	const allPagesRendered = allPagesColumns.map((pageColumns, index) => {
		return <Page key={index} allColumnsLines={pageColumns} />;
	});

	return (
		<React.Fragment>
			{allPagesRendered}
		</React.Fragment>
	);
}

AllPages.propTypes = {
	allLines: PropTypes.arrayOf(PropTypes.string).isRequired,
	columnsCount: PropTypes.number.isRequired,
	columnBreakOnParagraph: PropTypes.bool.isRequired,
};

export default AllPages;
