import React from 'react';
import PropTypes from 'prop-types';

import escapeHTML from '../../../core/escapeHTML';

function Page(props) {
	const { allColumnsLines } = props;

	const allSectionsRendered = allColumnsLines.map((columnLines, index) => {
		const columnLinesTxt = columnLines
			.map(line => line.content)
			.join('\n');

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
			<div className={'printPreview-pageContent'}>
				{allSectionsRendered}
			</div>
		</div>
	);
}
Page.defaultProps = {
	allColumnsLines: [],
};
Page.propTypes = {
	allColumnsLines: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default React.memo(Page);
