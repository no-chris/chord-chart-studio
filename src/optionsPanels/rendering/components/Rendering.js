import React from 'react';

import OptionPanel from '../../_components/OptionsPanel';

import GroupLabel from '../../../ui/sideBar/components/GroupLabel';
import Slider from '../../../ui/sideBar/components/Slider';
import Toggle from '../../../ui/sideBar/components/Toggle';
import Icon from '../../../ui/components/Icon';

function getEntryComponent(type) {
	switch (type) {
		case 'groupLabel': 	return GroupLabel;
		case 'select': 		return Toggle;
		case 'toggle': 		return Toggle;
		case 'range': 		return Slider;
	}
}

export default function Rendering(props) {
	return (
		<div className="rendering-options">
			<div className="sidebar-collapsed">
				<Icon iconName="settings" />
			</div>

			<div className="sidebar-expanded">
				<OptionPanel
					{...props}
					id={'rendering'}
					getEntryComponent={getEntryComponent}
				/>
			</div>
		</div>

	);
}
