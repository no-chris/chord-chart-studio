import { connect } from 'react-redux';

import { toggleLeftBar, toggleRightBar, setEditorMode, closeModal } from '../_state/actions';
import { isLeftBarCollapsed, isRightBarCollapsed, getEditorMode, getActiveModal } from '../_state/selectors';

import App from '../_components/App';


export default connect(
	state => ({
		activeModal: getActiveModal(state),
		editorMode: getEditorMode(state),
		isLeftBarCollapsed: isLeftBarCollapsed(state),
		isRightBarCollapsed: isRightBarCollapsed(state),
	}),

	{
		toggleLeftBar,
		toggleRightBar,
		setEditorMode,
		closeModal,
	}

)(App);


