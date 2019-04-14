import Rendering from '../_components/Rendering';
import OptionsPanelFactory from '../../_containers/OptionsPanelFactory';

import allWidgets from '../allWidgets';
import { getNonInteractableWidgets, getHiddenWidgets } from '../_state/selectors';

export default OptionsPanelFactory(allWidgets, getNonInteractableWidgets, getHiddenWidgets, Rendering);
