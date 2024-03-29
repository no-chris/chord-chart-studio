import { connect } from 'react-redux';

import {
	toggleLeftBar,
	toggleRightBar,
	setEditorMode,
} from '../_state/actions';
import {
	isLeftBarCollapsed,
	isRightBarCollapsed,
	getEditorMode,
} from '../_state/selectors';
import { getSelectedId } from '../../../../fileManager/_state/selectors';

import App from '../_components/App';

export default connect(
	(state) => ({
		editorMode: getEditorMode(state),
		isLeftBarCollapsed: isLeftBarCollapsed(state),
		isRightBarCollapsed: isRightBarCollapsed(state),
		selectedId: getSelectedId(state),
	}),

	{
		toggleLeftBar,
		toggleRightBar,
		setEditorMode,
	}
)(App);
