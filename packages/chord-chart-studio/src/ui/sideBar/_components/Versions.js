import getVersions from '../../../core/getVersions';
import './Versions.scss';

import React from 'react';

function Versions() {
	const versions = getVersions();
	return (
		<div className={'versions'}>
			<div className={'versions-isExpanded'}>
				Chords Chart Studio {versions['chord-chart-studio']}
				<br />
				ChordMark {versions['chord-mark']} <br />
				ChordSymbol {versions['chord-symbol']}
			</div>
		</div>
	);
}

export default React.memo(Versions);
