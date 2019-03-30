import React from 'react';

import AppLayout from '../plugins/ui/layouts/app/components/App';
import FileManager from '../plugins/fileManager/components/FileManager';

export default function Edit() {

	const fm = <FileManager />;

	return (
		<AppLayout
			activeRoute="print"
			leftBar={fm}
		/>
	);
}
