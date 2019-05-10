import React from 'react';

import getDimensionsFromDom from './getDimensionsFromDom';
import padColumns from './padColumns';
import { getOffsetHeight } from './element';

import Page from '../_components/Page';

const cssSelectors = {
	line: '.cmLine',
};

export default async function getAllLinesHeight(allLines, {
	columnsCount,
	documentSize,
	documentMargins,
	printFontSize
}) {
	const component = <Page
		allColumnsLines={padColumns(columnsCount, [allLines])}
		columnsCount={columnsCount}
		documentSize={documentSize}
		documentMargins={documentMargins}
		printFontSize={printFontSize}
	/>;

	const measuringFn = (container) => {
		const allLinesHeight = [];
		container.querySelectorAll(cssSelectors.line).forEach(line => {
			allLinesHeight.push(getOffsetHeight(line));
		});
		return allLinesHeight;
	};

	return await getDimensionsFromDom(component, measuringFn);
}
