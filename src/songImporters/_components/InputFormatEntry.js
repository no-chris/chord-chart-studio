import React from 'react';
import PropTypes from 'prop-types';

function InputFormatEntry(props) {
	const { setSourceType, sourceType, id, label } = props;

	const onChange = (e) => {
		setSourceType(e.target.value);
	};

	return (
		<>
			<input
				className={'sim-InputFormat_Entry'}
				type={'radio'}
				name={'inputFormat'}
				id={id}
				value={id}
				onChange={onChange}
				checked={sourceType === id}
			/>
			<label className={'sim-InputFormat_Label'} htmlFor={id}>
				{label}
			</label>
		</>
	);
}

InputFormatEntry.propTypes = {
	setSourceType: PropTypes.func.isRequired,
	sourceType: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

InputFormatEntry.defaultProps = {};

export default InputFormatEntry;
