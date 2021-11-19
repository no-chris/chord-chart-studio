import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../ui/_components/Icon';

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
		<>
			<div className={'sim-Input_Header'}>
				<Icon iconName={'arrow_drop_down'} />
				Edit directly below
				<Icon iconName={'arrow_drop_down'} />
			</div>
			<textarea
				className={allClasses.join(' ')}
				onChange={onChange}
				value={content}
				disabled={isDisabled}
				data-testid={'sim-input'}
			/>
		</>
	);
}

Input.propTypes = {
	content: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	setContent: PropTypes.func.isRequired,
};

Input.defaultProps = {};

export default Input;
