import React from 'react';
import PropTypes from 'prop-types';

import escapeHTML from '../../../core/escapeHTML';

function Page(props) {
	const { pageHeader, allColumnsLines } = props;

	const allSectionsRendered = allColumnsLines.map((columnLines, index) => {
		const columnLinesTxt = columnLines.join('\n');

		return (
			<div
				key={index}
				className={'printPreview-pageColumn'}
				dangerouslySetInnerHTML={{ __html: escapeHTML(columnLinesTxt) }}
			/>
		);
	});

	return (
		<div className={'printPreview-page'}>
			<div className={'printPreview-pageContentWrapper'}>
				<div className={'printPreview-pageContent'}>
					{pageHeader}
					<div className={'printPreview-pageColumnWrapper'}>
						{allSectionsRendered}
					</div>
				</div>
			</div>
		</div>
	);
}
Page.defaultProps = {
	allColumnsLines: [],
};
Page.propTypes = {
	pageHeader: PropTypes.element,
	allColumnsLines: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default React.memo(Page);
