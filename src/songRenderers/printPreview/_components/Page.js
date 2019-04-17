import React from 'react';
import PropTypes from 'prop-types';

function Page(props) {
	const { allColumnsLines } = props;

	const allSectionsRendered = allColumnsLines.map((columnLines, index) => (
		<div
			key={index}
			className={'printPreview-pageColumn'}
			dangerouslySetInnerHTML={{ __html: columnLines.join('')}}
		/>
	));

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
