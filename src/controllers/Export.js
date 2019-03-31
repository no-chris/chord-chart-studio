import React from 'react';

import AppLayout from '../plugins/ui/layouts/app/components/App';
import FileManager from '../plugins/fileManager/components/FileManager';

export default function Export() {

	const fm = <FileManager />;

	return (
		<AppLayout
			activeRoute="export"
			leftBar={fm}
		/>
	);
}
