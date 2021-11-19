import React from 'react';
import PropTypes from 'prop-types';

import FileActionEntry from './FileActionEntry';

function FileActions(props) {
	const { createFile, deleteFile, enableRename, startImport } = props;

	const allActions = [
		{
			icon: 'upload',
			text: 'Import',
			action: startImport,
		},
		{
			icon: 'add_circle',
			text: 'New',
			action: createFile,
		},
		{
			icon: 'create',
			text: 'Rename',
			action: enableRename,
		},
		{
			icon: 'delete',
			text: 'Delete',
			action: deleteFile,
		},
	];

	return (
		<div className={'fileManager-actionsList'}>
			{allActions.map((action, key) => (
				<FileActionEntry {...action} key={key} />
			))}
		</div>
	);
}

FileActions.propTypes = {
	createFile: PropTypes.func.isRequired,
	deleteFile: PropTypes.func.isRequired,
	enableRename: PropTypes.func.isRequired,
	startImport: PropTypes.func.isRequired,
};

export default React.memo(FileActions);
