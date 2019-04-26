/**
 * Documentation
 * https://mermaidjs.github.io/mermaid-live-editor
 *

 graph TD
 A[getNextLine] --> B(put in buffer)
 B --> C(increase bufferHeight)
 C --> D{Fits on<br />current column?}
 D -- YES --> E{isBreakable?}
 E -- NO --> A
 E -- YES --> F(Flush here)
 F --> G(decrease<br />remaining space)
 D -- NO --> H{isBreakable?}
 H -- NO --> A
 H -- YES --> I{Fits on<br />next column?}
 I -- YES --> J(Flush on<br />next column)
 I -- NO --> K(Dumb Flush)

 classDef center text-align:center;
 class A,B,C,D,E,F,G,H,I center

 */

const cssClasses = {
	emptyLine: 'ucc-empty-line',
	chordLine: 'ucc-chord-line',
	textLine: 'ucc-text-line',
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
	noEmptyLinesOnColumnStart = true,
	noOrphanTextLine = true,
}) {
	const layout = layoutFactory({
		columnsCount,
		firstPageHeight: normalPageHeight, //todo: fix this
		normalPageHeight,
		noEmptyLinesOnColumnStart,
	});

	let buffer = [];
	let bufferHeight = 0;

	const pageHeight = normalPageHeight; //todo: fix this

	if (pageHeight > 0) {
		allLinesWithHeight.forEach((line, lineIndex) => {

			if (shouldRenderLine(layout, line, buffer, noEmptyLinesOnColumnStart)) {
				buffer.push(line);
				bufferHeight += line.height;

				if (isBreakable(line, allLinesWithHeight[lineIndex + 1], { noOrphanTextLine })) {
					if (layout.fitsOnCurrentColumn(bufferHeight)) {
						layout.insert(buffer);

					} else if (layout.fitsOnNextColumn(bufferHeight)) {
						layout.insertOnNextColumn(buffer);

					} else {
						layout.insert(buffer);
					}
					buffer = [];
					bufferHeight = 0;
				}
			}
		});
	}
	return layout.get();
}

/**
 * Try to spot the case where the line is empty and will be rendered as the first line
 * of the next column, which we may want to avoid
 */
function shouldRenderLine(layout, line, buffer, noEmptyLinesOnColumnStart) {
	return !(
		isEmptyLine(line)
		&& !layout.fitsOnCurrentColumn(line.height)
		&& buffer.length === 0
		&& noEmptyLinesOnColumnStart === true
	);
}

function isBreakable(currentLine, nextLine, { noOrphanTextLine }) {
	return !(isChordLine(currentLine) && isTextLine(nextLine) && noOrphanTextLine === true);
}

function isEmptyLine(line) {
	return hasClass(line.content, cssClasses.emptyLine);
}

function isChordLine(line) {
	return hasClass(line.content, cssClasses.chordLine);
}

function isTextLine(line) {
	return hasClass(line.content, cssClasses.textLine);
}

function hasClass(line, className) {
	return line.indexOf(className) > -1;
}


function layoutFactory({ firstPageHeight, normalPageHeight, columnsCount }) {
	const allPagesColumns = [];

	let pageIndex = 0;
	let columnIndex = 0;
	let maxColumnHeight = getMaxColumnHeight();
	let currentColumnHeight = 0;

	allPagesColumns[pageIndex] = [];
	allPagesColumns[pageIndex][columnIndex] = [];

	function flushBuffer(buffer) {
		buffer.forEach(line => {
			if (shouldChangeColumn(currentColumnHeight + line.height)) {
				changeColumn();
			}
			allPagesColumns[pageIndex][columnIndex].push(line.content);
			currentColumnHeight += line.height;
		});
	}

	function getMaxColumnHeight() {
		return (pageIndex === 0) ? firstPageHeight : normalPageHeight;
	}

	function shouldChangeColumn(nextHeight) {
		return nextHeight > maxColumnHeight;
	}

	function changeColumn() {
		if (shouldChangePage()) {
			pageIndex++;
			allPagesColumns[pageIndex] = [];
			columnIndex = 0;
		} else {
			columnIndex++;
		}
		allPagesColumns[pageIndex][columnIndex] = [];
		currentColumnHeight = 0;
		maxColumnHeight = getMaxColumnHeight();
	}

	function shouldChangePage() {
		return columnIndex === (columnsCount - 1);
	}

	return {
		insert(buffer) {
			flushBuffer(buffer);
		},

		insertOnNextColumn(buffer) {
			changeColumn();
			flushBuffer(buffer);
		},

		fitsOnCurrentColumn(bufferHeight) {
			return (currentColumnHeight + bufferHeight) <= maxColumnHeight;
		},

		fitsOnNextColumn(bufferHeight) {
			const nextColumnHeight = (pageIndex === 0 && columnIndex < columnsCount)
				? firstPageHeight
				: normalPageHeight;
			return bufferHeight <= nextColumnHeight;
		},

		get() {
			return allPagesColumns;
		},
	};
}

