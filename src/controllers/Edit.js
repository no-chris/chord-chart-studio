import React from 'react';

import AppLayout from '../ui/layout/app/containers/App';
import FileManager from '../fileManager/containers/FileManager';
import Editor from '../editor/containers/Editor';
import RightBarPanel from '../optionsPanels/rendering/containers/Rendering';

export default function Edit() {
	const fm = <FileManager />;
	const rightBarPanel = <RightBarPanel />

	return (
		<AppLayout
			activeRoute="edit"
			leftBar={fm}
			rightBar={rightBarPanel}
		>
			<Editor />
		</AppLayout>
	);
}
