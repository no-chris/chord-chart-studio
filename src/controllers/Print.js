import React from 'react';

import AppLayout from '../ui/layout/app/_containers/App';
import FileManager from '../fileManager/_containers/FileManager';
import RightBarPanel from '../optionsPanels/rendering/_containers/Rendering';
import PrintPreview from '../songRenderers/printPreview/_containers/PrintPreview';

export default function Print() {
	const fm = <FileManager />;
	const rightBarPanel = <RightBarPanel />;

	return (
		<AppLayout
			activeRoute={'print'}
			leftBar={fm}
			rightBar={rightBarPanel}
		>
			<PrintPreview />
		</AppLayout>
	);
}
