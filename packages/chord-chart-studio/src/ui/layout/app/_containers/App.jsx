import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	editorModeChanged,
	getEditorMode,
	leftBarToggled,
	isLeftBarCollapsed,
	rightBarToggled,
	isRightBarCollapsed,
} from '../reducers';

import { getSelectedId } from '../../../../fileManager/_state/selectors';

import App from '../_components/App';

export default function AppContainer(props) {
	const dispatch = useDispatch();

	return (
		<App
			editorMode={useSelector(getEditorMode)}
			isLeftBarCollapsed={useSelector(isLeftBarCollapsed)}
			isRightBarCollapsed={useSelector(isRightBarCollapsed)}
			selectedId={useSelector(getSelectedId)}
			leftBarToggled={() => dispatch(leftBarToggled())}
			rightBarToggled={() => dispatch(rightBarToggled())}
			editorModeChanged={(mode) => dispatch(editorModeChanged(mode))}
			{...props}
		/>
	);
}
