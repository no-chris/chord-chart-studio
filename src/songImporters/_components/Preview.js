import React from 'react';
import PropTypes from 'prop-types';

import ChordSheetJS from 'chordsheetjs';
import chordSheetJs2ChordMark from '../../core/converters/chordSheetJs2ChordMark';

function Preview(props) {
	const { content, sourceType } = props;

	const parser = getParser(sourceType);
	try {
		const parsed = parser.parse(content);
		const preview = chordSheetJs2ChordMark(parsed);
		return <div className={'sim-Preview_Container'}>{preview}</div>;
	} catch (e) {
		return <div className={'sim-Preview_Container'}>{e.message}</div>;
	}
}

function getParser(sourceType) {
	switch (sourceType) {
		case 'chordpro':
			return new ChordSheetJS.ChordProParser();
		case 'ultimateGuitar':
			return new ChordSheetJS.UltimateGuitarParser();
		default:
			return new ChordSheetJS.ChordSheetParser();
	}
}

Preview.propTypes = {
	content: PropTypes.string.isRequired,
	sourceType: PropTypes.string.isRequired,
};

Preview.defaultProps = {};

export default Preview;
