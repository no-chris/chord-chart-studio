import React from 'react';

import AppLayout from '../ui/layout/app/containers/App';
import FileManager from '../fileManager/containers/FileManager';
import SongEditor from '../editor/songEditor/components/SongEditor';

export default function Edit() {
	const fm = <FileManager />;

	return (
		<AppLayout
			activeRoute="edit"
			leftBar={fm}
		>
			<SongEditor />
		</AppLayout>
	);
}
