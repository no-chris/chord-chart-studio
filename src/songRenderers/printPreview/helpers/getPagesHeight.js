import React from 'react';

import getDimensionsFromDom from './getDimensionsFromDom';
import padColumns from './padColumns';
import { getClientHeight } from './element';

import Page from '../_components/Page';
import PageHeader from '../_components/PageHeader';

export default async function getAllLinesHeight(
	title,
	{ columnsCount, documentSize, documentMargins, fontSize }
) {
	const component = (
		<Page
			pageHeader={<PageHeader title={title} />}
			allColumnsLines={padColumns(columnsCount)}
			documentSize={documentSize}
			documentMargins={documentMargins}
			fontSize={fontSize}
		/>
	);

	const measuringFn = (container) => {
		const pageContent = container.querySelector(
			'.printPreview-pageContent'
		);
		const pageColumnWrapper = container.querySelector(
			'.printPreview-pageColumnWrapper'
		);
		return {
			firstPageHeight: getClientHeight(pageColumnWrapper),
			normalPageHeight: getClientHeight(pageContent),
		};
	};

	return await getDimensionsFromDom(component, measuringFn);
}
