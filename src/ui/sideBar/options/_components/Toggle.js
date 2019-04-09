import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

export default function Toggle(props) {
	const {
		isEnabled,
		label,
		optionContext,
		optionKey,
		optionValue,
		setOption
	} = props;

	const classNames = ['option', 'optionToggle'];
	classNames.push(
		(optionValue === true) ? 'optionToggle-isOn' : 'optionToggle-isOff'
	);

	function handleClick() {
		setOption(optionContext, optionKey, !optionValue);
	}

	return (
		<div
			className={classNames.join(' ')}
			onClick={(isEnabled) ? handleClick : null}
		>
			<div className={'optionToggle-desc'}>{label}</div>
			<div className={'optionToggle-icon'}>
				<Icon iconName={(optionValue === true) ? 'toggle_on' : 'toggle_off' } />
			</div>
		</div>
	);
}

Toggle.propTypes = {
	isEnabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	optionContext: PropTypes.string.isRequired,
	optionKey: PropTypes.string.isRequired,
	optionValue: PropTypes.bool.isRequired,
	setOption: PropTypes.func.isRequired,
};
