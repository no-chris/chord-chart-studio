import React from 'react';

import Icon from '../../../../../ui/Icon.js';
import router from '../../../../../router';

export default function NavEntry(props) {
	const {
		text,
		icon,
		link,
		isActive,
	} = props;

	return (
		<li
			className={ (isActive) ? 'active' : null }
			onClick={() => router.navigateTo(link)}
		>
			<Icon iconName={icon} />{text}
		</li>
	);
}
