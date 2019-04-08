import React from 'react';

import AppLayout from '../ui/layout/app/containers/App';
import FileManager from '../fileManager/containers/FileManager';
import RightBarPanel from '../optionsPanels/rendering/containers/Rendering';
import PlayRenderer from '../songRenderers/playRenderer/_containers/PlayRenderer';

export default function Play() {
	const fm = <FileManager />;
	const rightBarPanel = <RightBarPanel />;

	return (
		<AppLayout
			activeRoute="play"
			leftBar={fm}
			rightBar={rightBarPanel}
		>
			<PlayRenderer />
		</AppLayout>
	);
}
