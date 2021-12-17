import React from 'react';
import PropTypes from 'prop-types';

import escapeHTML from '../../../core/escapeHTML';

function Page(props) {
	const {
		pageHeader,
		allColumnsLines,
		documentSize,
		documentMargins,
		fontSize,
	} = props;

	const allSectionsRendered = allColumnsLines.map((columnLines, index) => {
		const columnLinesTxt = columnLines.join('');

		return (
			<div
				key={index}
				className={'printPreview-pageColumn'}
				data-testid={'printPreview-pageColumn'}
				dangerouslySetInnerHTML={{ __html: escapeHTML(columnLinesTxt) }}
			/>
		);
	});

	const pageClasses = ['printPreview-page'];
	pageClasses.push('printPreview-page--' + documentSize);
	pageClasses.push('cmSong--fontSize' + fontSize);
	pageClasses.push('cmSong');

	const pageContentWrapperClasses = ['printPreview-pageContentWrapper'];
	pageContentWrapperClasses.push(
		'printPreview-pageContentWrapper--padding' + documentMargins
	);

	return (
		<div
			className={pageClasses.join(' ')}
			data-testid={'printPreview-page'}
		>
			<div
				className={pageContentWrapperClasses.join(' ')}
				data-testid={'printPreview-pageContentWrapper'}
			>
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
	documentSize: PropTypes.string.isRequired,
	documentMargins: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
};

export default React.memo(Page);
