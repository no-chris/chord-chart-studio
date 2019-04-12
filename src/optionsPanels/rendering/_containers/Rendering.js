import React from 'react';

import Rendering from '../_components/Rendering';

import { panelLayout, widgetsInitialState } from '../allWidgets';

import OptionsPanelFactory from '../../_containers/OptionsPanelFactory';

function RenderingContainer(props) {
	return <Rendering {...props} />;
}

export default OptionsPanelFactory(panelLayout, widgetsInitialState, RenderingContainer);

