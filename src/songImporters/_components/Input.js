import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
	const { content, setContent } = props;

	const onChange = (e) => {
		setContent(e.target.value);
	};

	return (
		<textarea
			className={'sim-Input_Textarea'}
			onChange={onChange}
			value={content}
		/>
	);
}

Input.propTypes = {
	content: PropTypes.string.isRequired,
	setContent: PropTypes.func.isRequired,
};

Input.defaultProps = {};

export default Input;
