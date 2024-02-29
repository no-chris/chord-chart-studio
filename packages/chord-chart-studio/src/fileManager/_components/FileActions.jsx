import React from 'react';
import PropTypes from 'prop-types';

import FileActionEntry from './FileActionEntry';

function FileActions(props) {
	const {
		selected,
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
			isDisabled: false,
		},
		{
			icon: 'add_circle',
			text: 'New',
			action: createFile,
			isDisabled: false,
		},
		{
			icon: 'create',
			text: 'Rename',
			action: enableRename,
			isDisabled: !selected,
		},
		{
			icon: 'delete',
			text: 'Delete',
			action: deleteFile,
			isDisabled: !selected,
		},
		{
			icon: 'print',
			text: 'Print',
			action: printFile,
			isDisabled: !selected,
		},
		{
			icon: 'download',
			text: 'Export',
			action: exportAsText,
			isDisabled: !selected,
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
	selected: PropTypes.string,
	createFile: PropTypes.func.isRequired,
	deleteFile: PropTypes.func.isRequired,
	enableRename: PropTypes.func.isRequired,
	exportAsText: PropTypes.func.isRequired,
	printFile: PropTypes.func.isRequired,
	startImport: PropTypes.func.isRequired,
};

export default React.memo(FileActions);
