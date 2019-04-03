import React from 'react';

import AppLayout from '../ui/layout/app/containers/App';
import FileManager from '../fileManager/containers/FileManager';

export default function Export() {

	const fm = <FileManager />;

	return (
		<AppLayout
			activeRoute="export"
			leftBar={fm}
		/>
	);
}
