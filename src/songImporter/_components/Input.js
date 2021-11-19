import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
	const { content, setContent, isDisabled } = props;

	const onChange = (e) => {
		setContent(e.target.value);
	};

	const allClasses = ['sim-Input_Textarea'];

	if (isDisabled) {
		allClasses.push('sim-Input_Textarea-Disabled');
	}

	return (
		<textarea
			className={allClasses.join(' ')}
			onChange={onChange}
			value={content}
			disabled={isDisabled}
			data-testid={'sim-input'}
		/>
	);
}

Input.propTypes = {
	content: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	setContent: PropTypes.func.isRequired,
};

Input.defaultProps = {};

export default Input;
