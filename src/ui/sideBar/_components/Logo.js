import './Logo.scss';

import React from 'react';

import Icon from '../../_components/Icon.js';

function Logo() {
	return (
		<div className="logo">
			<div className="logo-isCollapsed">
				<Icon iconName="queue_music" />
			</div>

			<div className="logo-isExpanded">
				<Icon iconName="queue_music" />Chords Charts Studio
			</div>
		</div>
	);
}

export default React.memo(Logo);
