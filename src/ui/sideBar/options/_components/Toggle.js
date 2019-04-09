import React from 'react';

import Icon from '../../../_components/Icon';

export default function Toggle(props) {
	const {
		panelEntry,
		widget,
		value,
		setOption
	} = props;

	const classNames = ['option', 'optionToggle'];
	classNames.push(
		(value === true) ? 'optionToggle-isOn' : 'optionToggle-isOff'
	);

	function handleClick() {
		setOption(widget.option.context, widget.option.key, !value);
	}

	return (
		<div
			className={classNames.join(' ')}
			onClick={(panelEntry.isEnabled) ? handleClick : null}
		>
			<div className={'optionToggle-desc'}>{widget.label}</div>
			<div className={'optionToggle-icon'}>
				<Icon iconName={(value === true) ? 'toggle_on' : 'toggle_off' } />
			</div>
		</div>
	);
}

