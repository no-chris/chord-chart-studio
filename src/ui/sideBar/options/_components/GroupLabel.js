import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

function GroupLabel(props) {
	const {
		icon,
		label
	} = props;

	return (
		<div className={'sb-optionGroupLabel'}>
			<Icon iconName={icon} /> {label}
		</div>
	);
}

GroupLabel.propTypes = {
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

export default React.memo(GroupLabel);
