import React from 'react';

import AppLayout from '../plugins/ui/layouts/app/components/App';
import FileManager from '../plugins/fileManager/components/FileManager';
import SongRenderer from '../plugins/songRenderer/components/SongRenderer';


export default function Play() {

	const fm = <FileManager />;

	return (
		<AppLayout
			activeRoute="play"
			leftBar={fm}
		>
			<SongRenderer />
		</AppLayout>
	);
}
