import React from 'react';

import Icon from '../../components/Icon';

export default function SelectChoice(props) {
	const {
		isActive,
		label,
		onClick
	} = props;

	const classNames = ['option-select-choice'];
	if (isActive) {
		classNames.push('is-active');
	}

	return (
		<div
			className={classNames.join(' ')}
			onClick={onClick}
		>
			<div className={'checked'}>
				{isActive && <Icon iconName={'check'} />}
			</div>
			<div className={'label'}>
				{label}
			</div>
		</div>
	);
}
