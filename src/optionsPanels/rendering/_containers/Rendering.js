import Rendering from '../_components/Rendering';
import OptionsPanelFactory from '../../_containers/OptionsPanelFactory';

import allWidgets from '../allWidgets';
import { getNonInteractableWidgets, getNonVisibleWidgets } from '../_state/selectors';

export default OptionsPanelFactory(allWidgets, getNonInteractableWidgets, getNonVisibleWidgets, Rendering);
