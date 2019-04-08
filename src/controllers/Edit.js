import React from 'react';

import AppLayout from '../ui/layout/app/_containers/App';
import FileManager from '../fileManager/_containers/FileManager';
import Editor from '../editor/_containers/Editor';
import RightBarPanel from '../optionsPanels/rendering/_containers/Rendering';

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
