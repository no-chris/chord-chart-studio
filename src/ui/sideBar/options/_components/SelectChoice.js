import './Select.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

function SelectChoice(props) {
	const {
		isSelected,
		label,
		onClick
	} = props;

	let checkIcon;
	const classNames = ['sb-optionSelectChoice'];

	if (isSelected) {
		classNames.push('sb-optionSelectChoice-isSelected');
		checkIcon = (
			<span className={'sb-optionSelectChoice-checkIcon'}>
				<Icon iconName={'check'} />
			</span>
		);
	}


	return (
		<div
			className={classNames.join(' ')}
			onClick={onClick}
		>
			<div className={'sb-optionSelectChoice-check'}>
				{isSelected && checkIcon}
			</div>
			<div className={'sb-optionSelectChoice-label'}>
				{label}
			</div>
		</div>
	);
}

SelectChoice.propTypes = {
	isSelected: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default React.memo(SelectChoice);

