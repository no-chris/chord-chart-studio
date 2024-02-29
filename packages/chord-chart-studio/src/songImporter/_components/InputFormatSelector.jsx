import React from 'react';
import PropTypes from 'prop-types';

import InputFormatEntry from './InputFormatEntry';

const allEntries = [
	{
		id: 'auto',
		label: 'Detect',
	},
	{
		id: 'chordPro',
		label: 'Bracketed chords (ChordPro)',
	},
	{
		id: 'chordsOverLyrics',
		label: 'Chords over lyrics (Ultimate Guitar...)',
	},
];

function InputFormatSelector(props) {
	const { setInputFormat, inputFormat, disableAll } = props;

	const rendered = allEntries.map((entry) => (
		<InputFormatEntry
			setInputFormat={setInputFormat}
			id={entry.id}
			key={entry.id}
			label={entry.label}
			inputFormat={inputFormat}
			isDisabled={disableAll}
		/>
	));

	return (
		<div className={'sim-InputFormat'}>
			Input format:
			{rendered}
		</div>
	);
}

InputFormatSelector.propTypes = {
	disableAll: PropTypes.bool.isRequired,
	setInputFormat: PropTypes.func.isRequired,
	inputFormat: PropTypes.string.isRequired,
};

InputFormatSelector.defaultProps = {};

export default InputFormatSelector;
