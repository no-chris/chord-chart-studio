import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon';

function SelectChoice(props) {
	const {
		isActive,
		label,
		onClick
	} = props;

	const classNames = ['sb-optionSelectChoice'];
	if (isActive) {
		classNames.push('sb-optionSelectChoice-isActive');
	}

	return (
		<div
			className={classNames.join(' ')}
			onClick={onClick}
		>
			<div className={'sb-optionSelectChoice-check'}>
				{isActive && <Icon iconName={'check'} />}
			</div>
			<div className={'sb-optionSelectChoice-label'}>
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

export default React.memo(SelectChoice);

