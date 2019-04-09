import React from 'react';
import Icon from '../../../_components/Icon';

export default function GroupLabel(props) {
	const { icon, label } = props;

	return (
		<div className={'optionGroupLabel'}>
			<Icon iconName={icon} /> {label}
		</div>
	);
}
