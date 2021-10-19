import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SelectChoice from './SelectChoice';

import Icon from '../../../_components/Icon';

function Select(props) {
	const [isOpen, setIsOpen] = useState(false);

	const {
		isInteractable,
		label,
		allChoices,
		optionContext,
		optionKey,
		optionValue,
		setOption,
	} = props;

	const classNames = ['sb-optionSelect'];
	if (!isInteractable) {
		classNames.push('sb-optionSelect-isNotInteractable');
	}

	const iconName = isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right';

	function toggleChoices() {
		setIsOpen(!isOpen);
	}

	const renderedChoices = !isOpen ? null : (
		<div className={'sb-optionSelect-choices'}>
			{allChoices.map((choice) => (
				<SelectChoice
					key={choice.value}
					label={choice.label}
					isSelected={optionValue === choice.value}
					onClick={() =>
						setOption(optionContext, optionKey, choice.value)
					}
				/>
			))}
		</div>
	);

	return (
		<div className={classNames.join(' ')}>
			<div
				className={'sb-optionSelect-title'}
				onClick={isInteractable ? toggleChoices : null}
			>
				<div className={'sb-optionSelect-desc'}>{label}</div>
				<div className={'sb-optionSelect-toggle'}>
					<span className={'sb-optionSelect-icon'}>
						<Icon iconName={iconName} />
					</span>
				</div>
			</div>
			{renderedChoices}
		</div>
	);
}

Select.propTypes = {
	isInteractable: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	allChoices: PropTypes.array.isRequired,
	optionContext: PropTypes.string.isRequired,
	optionKey: PropTypes.string.isRequired,
	optionValue: PropTypes.string.isRequired,
	setOption: PropTypes.func.isRequired,
};

export default Select;
