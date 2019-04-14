import { connect } from 'react-redux';

import { toggleLeftBar, toggleRightBar, setEditorMode} from '../_state/actions';
import { isLeftBarCollapsed, isRightBarCollapsed, getEditorMode } from '../_state/selectors';

import App from '../_components/App';


export default connect(
	state => ({
		isLeftBarCollapsed: isLeftBarCollapsed(state),
		isRightBarCollapsed: isRightBarCollapsed(state),
		editorMode: getEditorMode(state)
	}),

	{
		toggleLeftBar,
		toggleRightBar,
		setEditorMode,
	}

)(App);


