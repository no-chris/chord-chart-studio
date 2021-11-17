import React from 'react';
import PropTypes from 'prop-types';

function Preview(props) {
	const { chordMarkContent } = props;

	return <div className={'sim-Preview_Container'}>{chordMarkContent}</div>;
}

Preview.propTypes = {
	chordMarkContent: PropTypes.string,
};

Preview.defaultProps = {};

export default Preview;
