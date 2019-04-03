import React from 'react';

import AppLayout from '../ui/layout/app/containers/App';
import FileManager from '../fileManager/containers/FileManager';
import SongRenderer from '../editor/playRenderer/containers/PlayRenderer';


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
