import React from 'react';
import Icon from '../../components/Icon';

export default function GroupLabel(props) {
	const { panelEntry } = props;

	return (
		<div className={'option option-group-label'}>
			<Icon iconName={panelEntry.icon} /> {panelEntry.label}
		</div>
	);
}
