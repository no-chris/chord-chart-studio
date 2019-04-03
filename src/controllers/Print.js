import React from 'react';

import AppLayout from '../ui/layout/app/containers/App';
import FileManager from '../fileManager/containers/FileManager';
import SongRenderer from '../songRenderers/playRenderer/containers/PlayRenderer';
import PrintPreview from '../songRenderers/printPreview/PrintPreview';

export default function Print() {

	const fm = <FileManager />;

	return (
		<AppLayout
			activeRoute="print"
			leftBar={fm}
		>
			<PrintPreview>
				<SongRenderer />
			</PrintPreview>
		</AppLayout>
	);
}
