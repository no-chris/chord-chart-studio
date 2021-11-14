import React from 'react';
import PropTypes from 'prop-types';

function Preview(props) {
	const { sourceType, preview, error } = props;

	if (!error) {
		return <div className={'sim-Preview_Container'}>{preview}</div>;
	} else {
		return (
			<div className={'sim-Preview_Container'}>
				<div className={'sim-Preview_Error'}>
					<p>
						There was an error when trying to parse the song in the
						specified input format ({sourceType}).
						<br />
						Please correct the input or try another format.
						<br />
						The error was:
					</p>
					<p>&quot;{error}&quot;</p>
				</div>
			</div>
		);
	}
}

Preview.propTypes = {
	error: PropTypes.string,
	preview: PropTypes.string,
	sourceType: PropTypes.string.isRequired,
};

Preview.defaultProps = {};

export default Preview;
