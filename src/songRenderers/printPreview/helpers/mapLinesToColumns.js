const cssClasses = {
	emptyLine: 'ucc-empty-line'
};

/**
 *
 * @param {Object[]} allLinesWithHeight
 * @param {String} allLinesWithHeight.content
 * @param {Number} allLinesWithHeight.height
 * @param columnsCount
 * @param columnBreakOnParagraph
 * @param normalPageHeight
 * @returns {*[]}
 */
export default function mapLinesToColumns(allLinesWithHeight, {
	columnsCount,
	//columnBreakOnParagraph,
	normalPageHeight,
	noEmptyLinesOnColumnStart = true
}) {
	const allPagesColumns = [];

	let pageIndex = 0;
	let columnIndex = 0;

	allPagesColumns[pageIndex] = [];
	allPagesColumns[pageIndex][columnIndex] = [];


	const pageHeight = normalPageHeight; //todo: adapt with firstPage vs normalPage
	if (pageHeight > 0) {
		let currentColumnHeight = 0;

		allLinesWithHeight.forEach((line, lineIndex) => {
			if (shouldChangeColumn(currentColumnHeight + line.height, pageHeight)) {
				currentColumnHeight = 0;
				columnIndex++;

				if (shouldChangePage(columnIndex, columnsCount)) {
					columnIndex = 0;
					pageIndex++;
					allPagesColumns[pageIndex] = [];
				}

				allPagesColumns[pageIndex][columnIndex] = [];
			}

			if (!(isEmptyLine(line) && currentColumnHeight === 0 && noEmptyLinesOnColumnStart === true)) {
				currentColumnHeight += line.height;
				allPagesColumns[pageIndex][columnIndex].push(allLinesWithHeight[lineIndex]);
			}

		});
	}

	return allPagesColumns.map(allColumns => {
		return allColumns.map(column => {
			return column.map(line => line.content);
		});
	});
}


function shouldChangeColumn(currentHeight, maxHeight) {
	return currentHeight > maxHeight;
}


function shouldChangePage(columnIndex, columnsCount) {
	return  columnIndex === columnsCount;
}

function isEmptyLine(line) {
	return hasClass(line.content, cssClasses.emptyLine);
}

function hasClass(line, className) {
	return line.indexOf(className) > -1;
}
