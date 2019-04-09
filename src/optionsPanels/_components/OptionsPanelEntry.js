import React from 'react';

export default function OptionsPanelEntry(props) {
	const { isEnabled, isVisible } = props;

	const classNames = ['optionsPanelEntry'];
	if (!isEnabled) {
		classNames.push('optionsPanelEntry-isDisabled');
	}
	if (!isVisible) {
		classNames.push('optionsPanelEntry-isHidden');
	}

	return (
		<div className={classNames.join(' ')}>
			{props.children}
		</div>
	);
}
