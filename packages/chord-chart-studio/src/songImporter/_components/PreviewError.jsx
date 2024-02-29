import React from 'react';
import PropTypes from 'prop-types';

function PreviewError(props) {
	const { inputFormat, error } = props;

	return (
		<div className={'sim-Preview_Error'}>
			<p>
				There was an error when trying to parse the song in the
				specified input format ({inputFormat}).
				<br />
				Please correct the input or try another format.
				<br />
				The error was:
			</p>
			<p>&quot;{error}&quot;</p>
			<p>
				Hint: most of the time, this is related to an unclosed
				&quot;[&quot; or &quot;&#123;&quot; or an unsupported ChordPro
				directive
			</p>
		</div>
	);
}

PreviewError.propTypes = {
	error: PropTypes.string,
	inputFormat: PropTypes.string.isRequired,
};

PreviewError.defaultProps = {};

export default PreviewError;
