import React from 'react';
import PropTypes from 'prop-types';

import InputFormatEntry from './InputFormatEntry';

const allEntries = [
	{
		id: 'basic',
		label: 'Basic',
	},
	{
		id: 'chordpro',
		label: 'ChordPro',
	},
	{
		id: 'ultimateGuitar',
		label: 'Ultimate Guitar',
	},
];

function InputFormatSelector(props) {
	const { setSourceType, sourceType } = props;

	const rendered = allEntries.map((entry) => (
		<InputFormatEntry
			setSourceType={setSourceType}
			id={entry.id}
			key={entry.id}
			label={entry.label}
			sourceType={sourceType}
		/>
	));

	return (
		<div className={'sim-InputFormat'}>
			Input format:
			{rendered}
			<br />
			ChordMark preview:
		</div>
	);
}

InputFormatSelector.propTypes = {
	setSourceType: PropTypes.func.isRequired,
	sourceType: PropTypes.string.isRequired,
};

InputFormatSelector.defaultProps = {};

export default InputFormatSelector;
