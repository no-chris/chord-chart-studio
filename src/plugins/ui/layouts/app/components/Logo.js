import React from 'react';

import Icon from '../../../../../ui/Icon.js';

export default function Logo() {
	return (
		<div className="logo">
			<div className="sidebar-collapsed">
				<Icon iconName="queue_music" />
			</div>

			<div className="sidebar-expanded">
				<Icon iconName="queue_music" />Universal Chords Charts
			</div>
		</div>
	);
}
