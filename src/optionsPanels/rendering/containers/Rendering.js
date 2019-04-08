import React from 'react';

import Rendering from '../components/Rendering';

import allWidgets from '../allWidgets';
import allPanelEntries from '../allPanelEntries';

import OptionsPanelFactory from '../../_containers/OptionsPanelFactory';

function RenderingContainer(props) {

	return <Rendering {...props} />;
}

export default OptionsPanelFactory(allPanelEntries, allWidgets, RenderingContainer);

