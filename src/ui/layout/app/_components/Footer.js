import getVersions from '../getVersions';
import './Footer.scss';

import React from 'react';

function Footer() {
	const versions = getVersions();
	return (
		<div className={'appFooter'}>
			Chords Charts Studio {versions['chord-charts-studio']}
			<br />
			ChordMark {versions['chord-mark']} <br />
			ChordSymbol {versions['chord-symbol']}
		</div>
	);
}

export default React.memo(Footer);
