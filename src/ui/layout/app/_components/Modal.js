import './Modal.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongImporter from '../../../../songImporters/_containers/SongImporter'; // fixme: doh!

function Modal(props) {
	const { activeModal, closeModal } = props;

	let modalContent;

	switch (activeModal) {
		case 'none':
			return null;
		case 'importFile':
			modalContent = <SongImporter closeModal={closeModal} />;
			break;
	}

	return (
		<section className={'modal'} data-testid={'modal-overlay'}>
			<div className={'modal-Overlay'}></div>
			<div className={'modal-Container'}>{modalContent}</div>
		</section>
	);
}

Modal.propTypes = {
	activeModal: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default Modal;
