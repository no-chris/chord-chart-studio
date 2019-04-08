import React from 'react';

import AppLayout from '../ui/layout/app/_containers/App';
import FileManager from '../fileManager/_containers/FileManager';
import RightBarPanel from '../optionsPanels/rendering/_containers/Rendering';
import ExportPreview from '../songRenderers/exportPreview/_containers/ExportPreview';

export default function Export() {
	const fm = <FileManager />;
	const rightBarPanel = <RightBarPanel />;

	return (
		<AppLayout
			activeRoute="export"
			leftBar={fm}
			rightBar={rightBarPanel}
		>
			<ExportPreview />
		</AppLayout>
	);
}
