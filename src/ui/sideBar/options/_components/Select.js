import React, { useState } from 'react';

import SelectChoice from './SelectChoice';

import Icon from '../../../_components/Icon';

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
			<div className={'optionSelect-choices'}>
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
		<div className={'option optionSelect'}>
			<div
				className={'optionSelect-title'}
				onClick={toggleChoices}
			>
				<div className={'optionSelect-desc'}>{widget.label}</div>
				<div className={'optionSelect-toggle'}>
					<Icon iconName={iconName} />
				</div>
			</div>
			{choices}
		</div>
	);
}

