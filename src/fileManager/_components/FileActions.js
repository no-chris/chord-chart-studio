import React from 'react';
import PropTypes from 'prop-types';

import FileActionEntry from './FileActionEntry';

function FileActions(props) {
	const {
		createFile,
		deleteFile,
		enableRename,
		startImport,
		exportAsText,
		printFile,
	} = props;

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
		{
			icon: 'download',
			text: 'Export',
			action: exportAsText,
		},
		{
			icon: 'print',
			text: 'Print',
			action: printFile,
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
	exportAsText: PropTypes.func.isRequired,
	printFile: PropTypes.func.isRequired,
	startImport: PropTypes.func.isRequired,
};

export default React.memo(FileActions);
