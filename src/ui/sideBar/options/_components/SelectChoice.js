import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

export default function SelectChoice(props) {
	const {
		isActive,
		label,
		onClick
	} = props;

	const classNames = ['optionSelectChoice'];
	if (isActive) {
		classNames.push('optionSelectChoice-isActive');
	}

	return (
		<div
			className={classNames.join(' ')}
			onClick={onClick}
		>
			<div className={'optionSelectChoice-check'}>
				{isActive && <Icon iconName={'check'} />}
			</div>
			<div className={'optionSelectChoice-label'}>
				{label}
			</div>
		</div>
	);
}

SelectChoice.propTypes = {
	isActive: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
