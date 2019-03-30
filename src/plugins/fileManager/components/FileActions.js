import React from 'react';

import FileActionEntry from './FileActionEntry';

export default function FileActions(props) {
	const { createFile, deleteFile, enableRename } = props;

	const allActions = [
		{
			icon: 'add_circle',
			text: 'New',
			action: createFile
		},
		{
			icon: 'create',
			text: 'Rename',
			action: enableRename
		},
		{
			icon: 'delete',
			text: 'Delete',
			action: deleteFile
		},
	];

	return (
		<div className="fm-action-list">
			{
				allActions.map((action, key) =>
					<FileActionEntry {...action} key={key} />
				)
			}
		</div>
	);
}
