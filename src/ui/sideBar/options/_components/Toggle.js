import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

function Toggle(props) {
	const {
		isEnabled,
		label,
		optionContext,
		optionKey,
		optionValue,
		setOption
	} = props;

	const classNames = ['sb-option', 'sb-optionToggle'];
	classNames.push(
		(optionValue === true) ? 'sb-optionToggle-isOn' : 'sb-optionToggle-isOff'
	);

	function handleClick() {
		setOption(optionContext, optionKey, !optionValue);
	}

	return (
		<div
			className={classNames.join(' ')}
			onClick={(isEnabled) ? handleClick : null}
		>
			<div className={'sb-optionToggle-desc'}>{label}</div>
			<div className={'sb-optionToggle-icon'}>
				<span className={'sb-optionToggle-icon'}>
					<Icon iconName={(optionValue === true) ? 'toggle_on' : 'toggle_off' } />
				</span>
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

export default React.memo(Toggle);
