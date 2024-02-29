import React from 'react';
import PropTypes from 'prop-types';

import ModalConfirm from '../../ui/_components/ModalConfirm';

function DeleteConfirmModal(props) {
	const { selected, deleteFile, isDeleting, setIsDeleting } = props;

	if (!isDeleting) {
		return null;
	}

	const cancelDelete = () => setIsDeleting(false);
	const confirmDelete = () => {
		setIsDeleting(false);
		deleteFile(selected);
	};

	return (
		<ModalConfirm
			confirmAction={confirmDelete}
			confirmTitle={'DELETE'}
			cancelAction={cancelDelete}
		>
			Are you sure you want to delete this file?
			<br />
			This action cannot be undone.
		</ModalConfirm>
	);
}

DeleteConfirmModal.propTypes = {
	deleteFile: PropTypes.func.isRequired,
	isDeleting: PropTypes.bool.isRequired,
	selected: PropTypes.string.isRequired,
	setIsDeleting: PropTypes.func.isRequired,
};

export default DeleteConfirmModal;
