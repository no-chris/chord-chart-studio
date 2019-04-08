import React from 'react';

import Icon from '../../components/Icon';

export default function Toggle(props) {
	const {
		panelEntry,
		widget,
		value,
		setOption
	} = props;

	const classNames = ['option', 'option-toggle'];
	classNames.push(
		(value === true) ? 'option-toggle-on' : 'option-toggle-off'
	);

	function handleClick() {
		setOption(widget.option.context, widget.option.key, !value);
	}

	return (
		<div
			className={classNames.join(' ')}
			onClick={(panelEntry.isEnabled) ? handleClick : null}
		>
			<div className={'option-toggle-desc'}>{widget.label}</div>
			<div className={'option-toggle-icon'}>
				<Icon iconName={(value === true) ? 'toggle_on' : 'toggle_off' } />
			</div>
		</div>
	);
}

