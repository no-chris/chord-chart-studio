import './OptionsGroup.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

function OptionsGroup(props) {
	const { isInteractable, icon, label } = props;

	const classNames = ['sb-optionsGroup'];
	if (!shouldBeInteractable()) {
		classNames.push('sb-optionsGroup-isNotInteractable');
	}

	function shouldBeInteractable() {
		return isInteractable && props.children && props.children.length > 0;
	}

	return (
		<div className={classNames.join(' ')}>
			<div className={'sb-optionsGroup-title'}>
				<span className={'sb-optionsGroup-iconTitle'}>
					<Icon iconName={icon} />
				</span>{' '}
				{label}
			</div>
			<div className={'sb-optionsGroup-content'}>{props.children}</div>
		</div>
	);
}

OptionsGroup.propTypes = {
	isInteractable: PropTypes.bool.isRequired,
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	children: PropTypes.arrayOf(PropTypes.element),
};

OptionsGroup.defaultProps = {};

export default OptionsGroup;
