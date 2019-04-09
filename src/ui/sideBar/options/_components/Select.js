import React, { useState } from 'react';

import SelectChoice from './SelectChoice';

import Icon from '../../../_components/Icon';

export default function Select(props) {
	const [ isOpen, setIsOpen ] = useState(false);

	const {
		isEnabled,
		label,
		allChoices,
		optionContext,
		optionKey,
		optionValue,
		setOption
	} = props;

	const iconName = (isOpen) ? 'keyboard_arrow_down' : 'keyboard_arrow_right';

	function toggleChoices() {
		if (isEnabled) {
			setIsOpen(!isOpen);
		}
	}

	const renderedChoices = (!isOpen)
		? null
		: (
			<div className={'optionSelect-choices'}>
				{allChoices.map(choice =>
					<SelectChoice
						key={choice.value}
						label={choice.label}
						isActive={(optionValue === choice.value)}
						onClick={() => setOption(optionContext, optionKey, choice.value)}
					/>
				)}
			</div>
		);


	return (
		<div className={'option optionSelect'}>
			<div
				className={'optionSelect-title'}
				onClick={toggleChoices}
			>
				<div className={'optionSelect-desc'}>{label}</div>
				<div className={'optionSelect-toggle'}>
					<Icon iconName={iconName} />
				</div>
			</div>
			{renderedChoices}
		</div>
	);
}

