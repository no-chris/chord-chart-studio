import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon.js';
import router from '../../../../router';

function NavEntry(props) {
	const {
		label,
		icon,
		link,
		isActive,
	} = props;

	const classNames = ['mainNavEntry'];

	if (isActive) {
		classNames.push('mainNavEntry-isActive');
	}

	return (
		<li
			className={classNames.join(' ')}
			onClick={() => router.navigateTo(link)}
		>
			<Icon iconName={icon} />{label}
		</li>
	);
}

NavEntry.propTypes = {
	label: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
};


export default React.memo(NavEntry);
