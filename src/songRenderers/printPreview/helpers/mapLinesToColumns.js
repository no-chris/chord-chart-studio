
export default function mapLinesToColumns(allLines, columnsCount, dimensions) {
	const { normalPageHeight, allLinesHeight } = dimensions;

	const allPagesColumns = [];

	let pageIndex = 0;
	let columnIndex = 0;

	allPagesColumns[pageIndex] = [];
	allPagesColumns[pageIndex][columnIndex] = [];


	const pageHeight = normalPageHeight; //todo: adapt with firstPage vs normalPage
	if (pageHeight > 0) {
		let currentColumnHeight = 0;

		allLinesHeight.forEach((lineHeight, lineIndex) => {
			if (shouldChangeColumn(currentColumnHeight + lineHeight, pageHeight)) {
				currentColumnHeight = 0;
				columnIndex++;

				if (shouldChangePage(columnIndex, columnsCount)) {
					columnIndex = 0;
					pageIndex++;
					allPagesColumns[pageIndex] = [];
				}

				allPagesColumns[pageIndex][columnIndex] = [];
			}
			currentColumnHeight += lineHeight;
			allPagesColumns[pageIndex][columnIndex].push(allLines[lineIndex]);
		});
	}

	return allPagesColumns;
}


function shouldChangeColumn(currentHeight, maxHeight) {
	return currentHeight > maxHeight;
}


function shouldChangePage(columnIndex, columnsCount) {
	return  columnIndex === columnsCount;
}

