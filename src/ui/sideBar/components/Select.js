import React, { useState } from 'react';

import SelectChoice from './SelectChoice';

import Icon from '../../components/Icon';

export default function Select(props) {
	const [ isOpen, setIsOpen ] = useState(false);

	const {
		panelEntry,
		widget,
		value,
		setOption
	} = props;

	const iconName = (isOpen) ? 'keyboard_arrow_down' : 'keyboard_arrow_right';

	function toggleChoices() {
		if (panelEntry.isEnabled) {
			setIsOpen(!isOpen);
		}
	}

	const choices = (!isOpen)
		? null
		: (
			<div className={'option-select-choices'}>
				{widget.typeOption.choices.map(choice =>
					<SelectChoice
						key={choice.value}
						label={choice.label}
						isActive={(value === choice.value)}
						onClick={() => setOption(widget.option.context, widget.option.key, choice.value)}
					/>
				)}
			</div>
		);


	return (
		<div className={'option option-select'}>
			<div
				className={'option-select-title'}
				onClick={toggleChoices}
			>
				<div className={'option-select-desc'}>{widget.label}</div>
				<div className={'option-select-toggle'}>
					<Icon iconName={iconName} />
				</div>
			</div>
			{choices}
		</div>
	);
}

