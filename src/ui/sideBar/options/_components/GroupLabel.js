import React from 'react';
import Icon from '../../../_components/Icon';

export default function GroupLabel(props) {
	const { panelEntry } = props;

	return (
		<div className={'optionGroupLabel'}>
			<Icon iconName={panelEntry.icon} /> {panelEntry.label}
		</div>
	);
}
