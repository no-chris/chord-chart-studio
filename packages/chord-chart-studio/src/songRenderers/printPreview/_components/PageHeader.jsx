import React from 'react';
import PropTypes from 'prop-types';

function PageHeader(props) {
	const { title } = props;

	return <div className={'printPreview-pageHeader'}>{title}</div>;
}
PageHeader.defaultProps = {
	allColumnsLines: [],
};
PageHeader.propTypes = {
	title: PropTypes.string.isRequired,
};

export default React.memo(PageHeader);
