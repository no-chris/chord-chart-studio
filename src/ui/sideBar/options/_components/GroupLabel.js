import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

export default function GroupLabel(props) {
	const {
		icon,
		label
	} = props;

	return (
		<div className={'optionGroupLabel'}>
			<Icon iconName={icon} /> {label}
		</div>
	);
}

GroupLabel.propTypes = {
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};
