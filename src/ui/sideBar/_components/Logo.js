import React from 'react';

import Icon from '../../_components/Icon.js';

function Logo() {
	return (
		<div className="logo">
			<div className="sidebar-isCollapsed">
				<Icon iconName="queue_music" />
			</div>

			<div className="sidebar-isExpanded">
				<Icon iconName="queue_music" />Chords Charts Studio
			</div>
		</div>
	);
}

export default React.memo(Logo);
