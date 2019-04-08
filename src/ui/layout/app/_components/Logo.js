import React from 'react';

import Icon from '../../../_components/Icon.js';

export default React.memo(function Logo() {
	return (
		<div className="logo">
			<div className="sidebar-collapsed">
				<Icon iconName="queue_music" />
			</div>

			<div className="sidebar-expanded">
				<Icon iconName="queue_music" />Chords Charts Studio
			</div>
		</div>
	);
});
