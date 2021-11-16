import './Button.scss';

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, isDisabled, buttonName, onClick, type }) => {
	const allClassNames = ['Button'];

	if (type === 'primary') allClassNames.push('Button-primary');
	if (type === 'secondary') allClassNames.push('Button-secondary');
	if (isDisabled) allClassNames.push('Button-isDisabled');

	return (
		<button
			className={allClassNames.join(' ')}
			disabled={isDisabled}
			type={'button'}
			name={buttonName}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	buttonName: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
	isDisabled: false,
};

export default Button;
