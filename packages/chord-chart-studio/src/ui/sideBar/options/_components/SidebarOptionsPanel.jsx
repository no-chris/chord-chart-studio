import './SidebarOptionsPanel.scss';

import React from 'react';

import OptionPanel from '../../../../optionsPanels/_components/OptionsPanel';

import OptionsGroup from './OptionsGroup';
import Select from './Select';
import Slider from './Slider';
import Toggle from './Toggle';

function getEntryComponent(type) {
	switch (type) {
		case 'optionsGroup':
			return OptionsGroup;
		case 'select':
			return Select;
		case 'slider':
			return Slider;
		case 'toggle':
			return Toggle;
	}
}

export default function SidebarOptionPanel(props) {
	return (
		<div className={'sb-optionsPanel'}>
			<OptionPanel {...props} getEntryComponent={getEntryComponent} />
		</div>
	);
}
