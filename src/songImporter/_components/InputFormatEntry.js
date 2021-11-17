import React from 'react';
import PropTypes from 'prop-types';

function InputFormatEntry(props) {
	const { setInputFormat, inputFormat, id, label, isDisabled } = props;

	const onChange = (e) => {
		if (!isDisabled) {
			setInputFormat(e.target.value);
		}
	};

	const allInputClasses = ['sim-InputFormat_Entry'];
	const allLabelClasses = ['sim-InputFormat_Label'];

	if (isDisabled) {
		allInputClasses.push('sim-InputFormat_Entry-Disabled');
		allLabelClasses.push('sim-InputFormat_Label-Disabled');
	}

	return (
		<>
			<input
				className={allInputClasses.join(' ')}
				type={'radio'}
				name={'inputFormat'}
				id={id}
				value={id}
				onChange={onChange}
				checked={inputFormat === id}
			/>
			<label className={allLabelClasses.join(' ')} htmlFor={id}>
				{label}
			</label>
		</>
	);
}

InputFormatEntry.propTypes = {
	setInputFormat: PropTypes.func.isRequired,
	inputFormat: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool.isRequired,
};

InputFormatEntry.defaultProps = {};

export default InputFormatEntry;
