import React from 'react';
import PropTypes from 'prop-types';

function Page(props) {
	const { pageLines } = props;

	return (
		<div className={'printPreview-page'}>
			<div
				className={'printPreview-pageContent'}
				dangerouslySetInnerHTML={{ __html: pageLines.join('')}}
			/>
		</div>
	);
}
Page.defaultProps = {
	pageLines: [],
};
Page.propTypes = {
	pageLines: PropTypes.arrayOf(PropTypes.string),
};

export default React.memo(Page);
