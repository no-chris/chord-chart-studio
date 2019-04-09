import React from 'react';

import OptionPanel from '../../_components/OptionsPanel';

import GroupLabel from '../../../ui/sideBar/options/_components/GroupLabel';
import Select from '../../../ui/sideBar/options/_components/Select';
import Slider from '../../../ui/sideBar/options/_components/Slider';
import Toggle from '../../../ui/sideBar/options/_components/Toggle';
import Icon from '../../../ui/_components/Icon';

function getEntryComponent(type) {
	switch (type) {
		case 'groupLabel': 	return GroupLabel;
		case 'select': 		return Select;
		case 'slider': 		return Slider;
		case 'toggle': 		return Toggle;
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
