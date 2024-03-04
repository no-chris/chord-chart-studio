import getVersions from '../../../core/getVersions';
import './Versions.scss';

import React from 'react';

function Versions() {
	const versions = getVersions();
	return (
		<div className={'versions'}>
			<div className={'versions-isExpanded'}>
				Chord Chart Studio {versions['chord-chart-studio']}
				<br />
				ChordSymbol {versions['chord-symbol']} <br />
				ChordMark {versions['chord-mark']} <br />
				Logo by{' '}
				<a
					href={'https://spelling-bee-assistant.app/'}
					target={'_blank'}
					rel={'noreferrer'}
				>
					Dieter Raber
				</a>
			</div>
		</div>
	);
}

export default React.memo(Versions);
