import './Toggle.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

function Toggle(props) {
	const {
		isInteractable,
		label,
		optionContext,
		optionKey,
		optionValue,
		setOption
	} = props;

	const classNames = ['sb-optionToggle'];
	classNames.push(
		(optionValue === true) ? 'sb-optionToggle-isOn' : 'sb-optionToggle-isOff'
	);
	if (!isInteractable) {
		classNames.push('sb-optionToggle-isNotInteractable');
	}

	function handleClick() {
		setOption(optionContext, optionKey, !optionValue);
	}

	return (
		<div
			className={classNames.join(' ')}
			onClick={(isInteractable) ? handleClick : null}
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
	isInteractable: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	optionContext: PropTypes.string.isRequired,
	optionKey: PropTypes.string.isRequired,
	optionValue: PropTypes.bool.isRequired,
	setOption: PropTypes.func.isRequired,
};

export default React.memo(Toggle);
