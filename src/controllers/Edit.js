import React from 'react';

import AppLayout from '../plugins/ui/layouts/app/components/App';
import FileManager from '../plugins/fileManager/components/FileManager';
import SongRenderer from '../plugins/songRenderer/components/SongRenderer';

export default function Edit() {

	const fm = <FileManager />;

	return (
		<AppLayout
			activeRoute="edit"
			leftBar={fm}
		>
			<SongRenderer />
		</AppLayout>
	);
}
