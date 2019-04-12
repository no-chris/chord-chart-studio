import './OptionsGroup.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

function OptionsGroup(props) {
	const [ isOpen, setIsOpen ] = useState(false);

	const {
		isInteractable,
		icon,
		label
	} = props;

	const classNames = ['sb-optionsGroup'];
	if (!shouldBeInteractable()) {
		classNames.push('sb-optionsGroup-isNotInteractable');
	}

	function shouldBeInteractable() {
		return isInteractable && props.children && props.children.length > 0;
	}

	function handleClick() {
		setIsOpen(!isOpen);
	}

	return (
		<div className={classNames.join(' ')}>
			<div
				className={'sb-optionsGroup-title'}
				onClick={(shouldBeInteractable()) ? handleClick : null}
			>
				<div className={'sb-optionsGroup-label'}>
					<span className={'sb-optionsGroup-iconTitle'}><Icon iconName={icon} /></span> {label}
				</div>
				<div className={'sb-optionsGroup-toggle'}>
					<span className={'sb-optionsGroup-iconToggle'}>
						<Icon iconName={(isOpen) ? 'unfold_less' : 'unfold_more' } />
					</span>
				</div>
			</div>
			<div className={'sb-optionsGroup-content'}>
				{isOpen && props.children}
			</div>
		</div>
	);
}

OptionsGroup.propTypes = {
	isInteractable: PropTypes.bool.isRequired,
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	children: PropTypes.arrayOf(PropTypes.element),
};

export default OptionsGroup;
