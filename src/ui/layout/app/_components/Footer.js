import getVersions from '../getVersions';
import './Footer.scss';

import React from 'react';

function Footer() {
	const versions = getVersions();
	return (
		<div className={'appFooter'}>
			Chords Charts Studio {versions['chord-charts-studio']}
			- ChordMark {versions['chord-mark']}
			- ChordSymbol {versions['chord-symbol']}
		</div>
	);
}

export default React.memo(Footer);
