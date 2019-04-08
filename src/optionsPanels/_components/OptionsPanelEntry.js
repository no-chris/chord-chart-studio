import React from 'react';

export default function OptionsPanelEntry(props) {
	const { isEnabled, isVisible } = props;

	const classNames = ['options-panel-entry'];
	if (!isEnabled) {
		classNames.push('options-panel-entry-disabled');
	}
	if (!isVisible) {
		classNames.push('options-panel-entry-hidden');
	}

	return (
		<div className={classNames.join(' ')}>
			{props.children}
		</div>
	);
}
