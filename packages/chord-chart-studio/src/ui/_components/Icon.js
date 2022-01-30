import './Icon.scss';

import React from 'react';
import PropTypes from 'prop-types';

function Icon(props) {
	const { iconName } = props;

	const classList = ['icon', 'material-icons'];

	return <i className={classList.join(' ')}>{iconName}</i>;
}

Icon.propTypes = {
	iconName: PropTypes.string.isRequired,
};

export default React.memo(Icon);
